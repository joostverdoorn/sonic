import   Key                             from './key';
import   Range                           from './range';
import   State                           from './state';
import   StateIterator                   from './state_iterator';
import   { Observer, Observable, Subscription, Subject }   from './observable';
import  { Patch, Operation }   from './patch';

export class List<V> implements State<V>, Observable<V> {
  state: State<V>;
  protected _subject: Subject<V>;

  constructor(initial?: State<V>) {
    Object.keys(StateIterator).forEach( (key: string) => this[key] = (...args: any[]) => StateIterator[key](this.state, ...args));
    Object.keys(List).forEach( (key: string) => this[key] = (...args: any[]) => List[key](this, ...args));
    if (initial != null) this.state = initial;
    this._subject = new Subject<V>();
  }

  get get(): (key: Key) => Promise<V> {
    return this.state.get;
  }

  get prev(): (key: Key) => Promise<Key> {
    return this.state.prev;
  }

  get next(): (key: Key) => Promise<Key> {
    return this.state.next;
  }

  add(key: Key, value: V): Promise<void> {
    return this.onInvalidate([{type: Operation[Operation.add], key, value}]);
  }

  replace(key: Key, value: V): Promise<void> {
    return this.state.get(key).then(old => this.onInvalidate([{type: Operation[Operation.replace], key, value, oldValue: old}]));
  }

  remove(key: Key): Promise<void> {
    return this.onInvalidate([{type: Operation[Operation.remove], key}]);
  }

  observe(observer: Observer<V>): Subscription {
    return this._subject.observe(observer);
  }

  onInvalidate(patches: Patch<V>[]): Promise<void> {
    console.log("Number of events received:", patches.length);
    patches.forEach( (patch) => {
      switch(patch.type) {
        case Operation[Operation.add]:
          this.state = State.add(this.state, patch.key, patch.value);
        break;
        case Operation[Operation.remove]:
          this.state = State.remove(this.state, patch.key);
        break;
        case Operation[Operation.replace]:
          this.state = State.replace(this.state, patch.key, patch.value);
        break;
      }
    });
    return Promise.resolve(this._subject.notify(patches));
  };
}

export module List {
  export function reverse<V>(old: List<V>): List<V> {
    var state = old.state,
        list = new List(State.reverse(state));

    old.observe({
      onInvalidate(patches: Patch<V>[]): Promise<void> {
        return Promise.all(patches.map(patch => Patch.reverse(patch, state))).then((res) => list.onInvalidate(res));
      }
    });

    return list;
  }
  export function map<V, W>(old: List<V>, mapFn: (value: V, key?: Key) => W | Promise<W>): List<W> {
    var list = new List(State.map(old.state, mapFn));

    old.observe({
      onInvalidate(patches: Patch<V>[]): Promise<void> {
        return Promise.all(patches.map(patch => Patch.map(patch, mapFn))).then((res) => list.onInvalidate(res));
      }
    });

    return list;
  }

  export function filter<V>(old: List<V>, filterFn: (value: V, key?: Key) => boolean): List<V> {
    var state = old.state,
      list = new List(State.filter(old.state, filterFn));

    old.observe({
      onInvalidate(patches: Patch<V>[]): Promise<void> {
        return Promise.all(patches.map( patch => Patch.filter(patch, filterFn, state)))
          .then(res => res.filter(event => event != null))
          .then( (res: Patch<V>[]) => res.length ? list.onInvalidate(res) : undefined);
      }
    });

    return list;
  }

}

export default List;
