import uniqueId    from './unique_id';
import MutableList from './mutable_list';

export default class Unit<V> extends MutableList<V, number> {

  private _id: number;
  private _value: V;

  constructor(value: V) {
    super();
    if(arguments.length > 2) this.splice(null, null, value);
  }

  has(id: number) {
    return this._id == id;
  }

  get(id: number): V {
    if(this.has(id)) return this._value ;
  }

  prev(id: number): number {
    if(id == null) return this._id;
    return null;
  }

  next(id: number): number {
    if(id == null) return this._id;
    return null;
  }

  set(id: number, value: V): boolean {
    this._id = id;
    this._value = value;
    this._invalidate();

    return true;
  }

  splice(prev: number, next: number, value: V): boolean {
    if(arguments.length > 2) return this.set(uniqueId(), value);

    delete this._id;
    delete this._value;
    this._invalidate();

    return true;
  }
}
