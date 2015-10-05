import   Key                             from './key';
import   Range                           from './range';
import   State                           from './state';
import   StateIterator                   from './state_iterator';
import   { IObservable, ISubscription, Subject }   from './observable';

export interface ListObserver {
  onInvalidate<V>(...events: ListEvent<V>[]): void;
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
    this.onInvalidate({type: EventType.add, key, value});
    return Promise.resolve();
  }

  replace(key: Key, value: V): Promise<void> {
    this.onInvalidate({type: EventType.replace, key, value});
    return Promise.resolve();
  }

  remove(key: Key): Promise<void> {
    this.onInvalidate({type: EventType.remove, key});
    return Promise.resolve();
  }

  observe(observer: ListObserver): ISubscription {
    return this._subject.observe(observer);
  }

  onInvalidate(...events: ListEvent<V>[]): void {
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
    this._subject.notify((observer) => observer.onInvalidate(...events));
  };
}

export module List {

  export function map<V, W>(old: List<V>, mapFn: (value: V, key?: Key) => W | Promise<W>): List<W> {
    var list = new List(State.map(old.state, mapFn));

    old.observe({
      onInvalidate(...events: ListEvent<V>[]): void {
        Promise.all(events.map( (event) => {
          return Promise.resolve(mapFn(event.value, event.key)).then( (value: W) => {
            return <ListEvent<W>>{type: event.type, key: event.key, value}
          })
        })).then((res) => list.onInvalidate(...res));
      }
    });

    return list;
  }

}

export default List;
