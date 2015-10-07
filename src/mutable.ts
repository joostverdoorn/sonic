import Key                              from './key';
import { Observable, Subject, Observer }          from './observable';
import { Patch, SetPatch, DeletePatch } from './patch';
import State                            from './state';
import List, { factory as ListFactory } from './list';
import Range                            from './range';
import StateIterator                    from './state_iterator';

export interface Mutable<V> extends List<V> {
  modify(patch: Patch<V>): Promise<void>;
}

export module Mutable {

  export function splice<V>(mutable: Mutable<V>, range: Range, values: State<V>): Promise<void> {
    var reduceFn = (memo: void | Promise<void>, value: V, key: Key): Promise<void> => {
      return Promise.resolve(memo).then(() => set(mutable, key, value, range[1]));
    };

    return StateIterator.reduce(values, reduceFn,
    StateIterator.every(mutable.state, (value: V, key: Key) => del(mutable, key).then(() => true)).then(() => {}));
  }

  export function set<V>(mutable: Mutable<V>, key: Key, value: V, before?: Key): Promise<void> {
    var patch: SetPatch<V> = {
      operation: Patch.SET,
      key,
      value
    };

    if (before !== undefined) patch.before = before;

    return mutable.modify(patch);
  }
  export function del<V>(mutable: Mutable<V>, key: Key): Promise<void> {
    var patch: DeletePatch<V> = {
      operation: Patch.DELETE,
      key
    };

    return mutable.modify(patch);
  }
}

export module factory {
  export function create<V>(state: State<V>): Mutable<V> {
    const subject = new Subject,
          list = ListFactory.create(state, subject)

    return {
      get state() {return list.state},
      subscribe: list.subscribe,
      // onNext: subject.onNext,
      modify: (patch: Patch<V>) => subject.onNext(patch)
    }

  }
}

export default Mutable;
