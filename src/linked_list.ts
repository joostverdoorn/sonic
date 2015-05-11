import Id          from './id';
import uniqueId    from './unique_id';
import MutableList from './mutable_list';

export default class LinkedList<V> extends MutableList<V> {
  private _byId: Object;
  private _next: Object;
  private _prev: Object;

  constructor(array: V[]) {
    super();

    this._byId = Object.create(null);
    this._prev = Object.create(null);
    this._next = Object.create(null);

    this._prev[-1] = -1;
    this._next[-1] = -1;

    this.splice(null, null, ...array);
  }

  has = (id: number) => {
    return id in this._byId;
  }

  get = (id: number) => {
    return this._byId[id];
  }

  prev = (id: number = -1) => {
    return this._prev[id];
  }

  next = (id: number = -1) => {
    return this._next[id];
  }

  set = (id: number, value: V) => {
    if(!this.has(id)) return false;

    this._byId[id] = value;
    this._invalidate(this._prev[id], this._next[id])
    return true;
  }

  splice = (prev = -1, next = -1, ...values: V[]) => {
    var _next: number, _prev: number, value: V, id: number;

    while(_next = this._next[_next || prev]) {
      delete this._next[this._prev[_next]];
      delete this._next[_prev];

      if(_next == next) break;
      delete this._byId[_next];
    }

    while(_prev = this._prev[_prev || next]) {
      delete this._prev[this._next[_prev]];
      delete this._prev[_prev];

      if(_prev == prev) break;
      delete this._byId[_next];
    }

    for(value of values) {
      id = uniqueId();
      this._byId[id] = value;
      this._prev[id] = prev;
      this._next[prev] = id;
      prev = id;
    }

    this._prev[next] = prev;
    this._next[prev] = next;

    this._invalidate(prev, next);
    return true;
  }
}
