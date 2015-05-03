import uniqueId         from 'unique_id';
import Observable       from 'observable';
import { IMutableList } from 'mutable_list';

export default class LinkedList<V> extends Observable<number> implements IMutableList<V,number> {

  private _byId: Object;
  private _next: Object;
  private _prev: Object;

  constructor(source: V[]) {
    super();
    this._byId = Object.create(null);
    this._prev = Object.create(null);
    this._next = Object.create(null);

    this._prev[-1] = -1;
    this._next[-1] = -1;

    this.splice(null, null, ...source);
  }

  has(id: number): boolean {
    return id in this._byId;
  }

  get(id: number): V {
    return this._byId[id];
  }

  prev(id: number = -1): number {
    return this._prev[id];
  }

  next(id: number = -1): number {
    return this._next[id];
  }

  set(id: number, value: V): boolean {
    if(!this.has(id)) return false;

    this._byId[id] = value;
    this._invalidate(this._prev[id], this._next[id])
    return true;
  }

  splice(prev: number = -1, next: number = -1, ...values): boolean {
    var _next, _prev, value, id;

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

  _invalidate(prev: number, next: number): boolean {
    if(!this.has(prev)) prev = null;
    if(!this.has(next)) next = null;
    return super._invalidate(prev, next);
  }
}
