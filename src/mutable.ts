import Key                              from './key';
import { Observable, Subject, Observer }          from './observable';
import { Patch, SetPatch, DeletePatch } from './patch';
import State, { factory as StateFactory } from './state';
import List, { factory as ListFactory } from './list';
import Range                            from './range';
import StateIterator                    from './state_iterator';
import XHR                              from './xhr';
import Lens                             from './lens';

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

  export function compose<V,W>(parent: Mutable<V>, lens: Lens<V, W>): Mutable<W> {
    var subject = new Subject,
        list = List.map(ListFactory.create(parent.state, subject), lens.get);

    return {
      get state() {return list.state},
      subscribe: list.subscribe,
      modify: (patch: Patch<W>) => {
        if (Patch.isSetPatch(patch)) {
          if (patch.before !== undefined) return parent.modify(<Patch<V>>{
            operation: patch.operation,
            key: patch.key,
            value: lens.set(undefined, patch.value),
            before: patch.before
          });

          return parent.state.get(patch.key).then( value => parent.modify(<Patch<V>>{
            operation: patch.operation,
            key: patch.key,
            value: lens.set(value, patch.value)
          })).then( () => subject.onNext(patch));
        }

        return parent.modify(patch).then(() => subject.onNext(patch));
      }
    }
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

  export function fromURL<V>(urlRoot: string): Mutable<V> {
    const subject = new Subject(),
          list: List<V> = ListFactory.create(StateFactory.fromURL(urlRoot), subject);

    return {
      get state() {return list.state},
      subscribe: subject.subscribe,
      modify: (patch: Patch<V>) => new Promise( (resolve) => {
        if (Patch.isSetPatch(patch)) {
          if (patch.before !== undefined) return resolve(XHR.post(urlRoot, patch.value));
          return resolve(XHR.put(urlRoot + "/" + patch.key, patch.value))
        }

        return resolve(XHR.delete(urlRoot + "/" + patch.key));
      }).then(() => subject.onNext(patch))
    }
  }
}

export default Mutable;
