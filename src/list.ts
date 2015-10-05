import   Key                             from './key';
import   Range                           from './range';
import   State                           from './state';
import   StateIterator                   from './state_iterator';
import   { IObservable, ISubscription, Subject }   from './observable';
// import   Cache                                     from './cache';

export interface ListObserver {
  onInvalidate<V>(...events: ListEvent<V>[]): Promise<void>;
}

export enum EventType {
  "add",
  "remove",
  "replace"
}

export interface ListEvent<V> {
  type: EventType,
  key: Key,
  value?: V,
  oldValue?: V
}

export class List<V> implements State<V>, IObservable<ListObserver> {
  state: State<V>;
  protected _subject: Subject<ListObserver>;

  constructor(initial?: State<V>) {
    Object.keys(StateIterator).forEach( (key: string) => this[key] = (...args: any[]) => StateIterator[key](this.state, ...args));
    Object.keys(List).forEach( (key: string) => this[key] = (...args: any[]) => List[key](this, ...args));
    if (initial != null) this.state = initial;
    this._subject = new Subject<ListObserver>();
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
    return this.onInvalidate({type: EventType.add, key, value});
  }

  replace(key: Key, value: V): Promise<void> {
    return this.state.get(key).then(old => this.onInvalidate({type: EventType.replace, key, value, oldValue: old}));
  }

  remove(key: Key): Promise<void> {
    return this.onInvalidate({type: EventType.remove, key});
  }

  observe(observer: ListObserver): ISubscription {
    return this._subject.observe(observer);
  }

  onInvalidate(...events: ListEvent<V>[]): Promise<void> {
    events.forEach( (event) => {
      switch(event.type) {
        case EventType.add:
          this.state = State.add(this.state, event.key, event.value);
        break;
        case EventType.remove:
          this.state = State.remove(this.state, event.key);
        break;
        case EventType.replace:
          this.state = State.replace(this.state, event.key, event.value);
        break;
      }
    });
    return Promise.resolve(this._subject.notify((observer) => observer.onInvalidate(...events)));
  };
}

export module List {

  // export function cache<V>(old: List<V>): List<V> {
  //   return new Cache(old);
  // }

  export function map<V, W>(old: List<V>, mapFn: (value: V, key?: Key) => W | Promise<W>): List<W> {
    var list = new List(State.map(old.state, mapFn));

    old.observe({
      onInvalidate(...events: ListEvent<V>[]): Promise<void> {
        return Promise.all(events.map( (event) => {
          return Promise.resolve(mapFn(event.value, event.key)).then( (value: W) => {
            return <ListEvent<W>>{type: event.type, key: event.key, value}
          })
        })).then((res) => list.onInvalidate(...res));
      }
    });

    return list;
  }

  export function filter<V>(old: List<V>, filterFn: (value: V, key?: Key) => boolean): List<V> {
    var state = State.filter(old.state, filterFn),
      list = new List(state);

    old.observe({
      onInvalidate(...events: ListEvent<V>[]): Promise<void> {
        return Promise.all(events
          .map( (event) => {
            if (event.type == EventType.add && filterFn(event.value, event.key)) return Promise.resolve(event);

            if (event.type == EventType.replace) {
              if (filterFn(event.oldValue, event.key) && (!filterFn(event.value, event.key))) {
                return Promise.resolve({type: EventType.remove, key: event.key});
              }

              if ((!filterFn(event.oldValue, event.key)) && (filterFn(event.value, event.key))) {
                return Promise.resolve({type: EventType.add, key: event.key, value: event.value});
              }

              if (filterFn(event.oldValue, event.key) && filterFn(event.value, event.key)) {
                return event;
              }

            }


            if (event.type == EventType.remove) {
              return state.get(event.key).then(value => filterFn(value, event.key) ? event : null, () => {})
            }

            return null;


        }))
        .then( (res) => list.onInvalidate(...res.filter(event => event != null)));
      }
    });

    return list;
  }

}

export default List;
