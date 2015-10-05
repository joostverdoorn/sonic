import Key   from './key';
import State from './state';
import { List, EventType, ListObserver, ListEvent }  from './list';
import { Subject, ISubscription } from './observable';

export class Cache<V> extends List<V> implements ListObserver {
  static DELETED = {};

  protected _list: List<V>;

  protected _get:  {[key: string]: V};
  protected _prev: {[key: string]: Key};
  protected _next: {[key: string]: Key};

  get state(): State<V> {
    var _get = this._get,
        _prev = this._prev,
        _next = this._next,
        old   = this._list.state;

    var state = {
      get: (key: Key): Promise<V> => {
        if (_get[key] == Cache.DELETED) return Promise.reject<V>(new Error);
        return _get[key] == null ? (old.get(key).then((res) => _get[key] = res)): Promise.resolve(_get[key]);
      },
      prev: (key: Key): Promise<Key> => {
        return _prev[key] == null ? (old.prev(key).then((res) => (_next[res] = key, _prev[key] = res))) : Promise.resolve(_prev[key]);
      },
      next: (key: Key): Promise<Key> => {
        return _next[key] == null ? (old.next(key).then((res) => (_prev[res] = key, _next[key] = res))) : Promise.resolve(_next[key]);
      }
    }

    return state;
  }

  constructor(list: List<V>) {
    super();
    this._list = list;

    this._get  = Object.create(null);
    this._prev = Object.create(null);
    this._next = Object.create(null);

    list.observe(this);
  }

  onInvalidate(...events: ListEvent<V>[]): void {
    this._get = Object.create(this._get);
    this._prev = Object.create(this._prev);
    this._next = Object.create(this._next);

    events.forEach( (event) => {
      var key = event.key,
          value = event.value;

      switch(event.type) {
        case EventType.add:
          this._get[key] = value;

          var prev = this._prev['null'],
              next = <Key> null;

          this._prev[next] = key;
          this._next[key] = next;

          this._prev[key] = prev;
          this._next[prev] = key;



        break;
        case EventType.remove:
          this._get[key] = <V>Cache.DELETED;

          var prev = this._prev[key],
              next = this._next[key];

          this._prev[next] = prev;
          this._next[prev] = next;
        break;
        case EventType.replace:
          this._get[key] = value;
        break;
      }
    });
    this._subject.notify((observer) => observer.onInvalidate(...events));
  }
}

export default Cache;
