import Observable       from 'observable';
import { IMutableList } from 'mutable_list';

export default class ArrayList<V> extends Observable<number> implements IMutableList<V,number> {

  private _source: V[];

  constructor(source: V[] = []) {
    super();
    this._source = source;
  }

  has(id: number): boolean {
    return -1 < id && id < this._source.length;
  }

  get(id: number): V {
    if(this.has(id)) return this._source[id];
    return;
  }

  prev(id: number): number {
    if(this._source.length > 0 && id != null && this.has(id) && this.has(id - 1)) return id - 1;
    return null;
  }

  next(id: number): number {
    if(this._source.length > 0 && id != null && this.has(id) && this.has(id + 1)) return id + 1;
    return null;
  }

  set(id: number, value: V): boolean {
    if(!this.has(id)) return false;
    this._source[id] = value;
  }

  splice(prev: number, next: number, ...values: V[]): boolean {
    if(prev == null) prev = -1;
    else if(!this.has(prev)) return false;

    if(next == null) next = this._source.length;
    else if(!this.has(next)) return false;

    this._source.splice(prev + 1, next - prev - 1, ...values);
    this._invalidate(prev, null);
    return true;
  }

  _invalidate(prev: number, next: number): boolean {
    if(!this.has(prev)) prev = null;
    if(!this.has(next)) next = null;
    return super._invalidate(prev, next);
  }
}
