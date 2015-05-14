import Id from './id';
import Observable from './observable';
import { IListObserver } from './observable_list';
import MutableList from './mutable_list';

export class ArrayList<V> extends MutableList<V> {
  private _array: V[];
  private _invalidate: (prev: Id, next: Id) => void;

  constructor(array: V[] = []) {
    super();
    this._array = array;

    new Observable((notifier) => {
      this._invalidate = function(prev: Id, next: Id) {
        notifier(function(observer: IListObserver) {
          observer.onInvalidate(prev, next)
        });
      }
    });
  }

  has(id: Id): boolean {
    return -1 < id && id < this._array.length;
  }

  get(id: number): V {
    if(this.has(id)) return this._array[id];
    return;
  }

  prev(id?: number): number {
    if(id == null && this._array.length) return this._array.length - 1;
    if(this._array.length > 0 && id != null && this.has(id) && this.has(id - 1)) return id - 1;
    return null;
  }

  next(id?: number): number {
    if(id == null && this._array.length) return 0;
    if(this._array.length > 0 && id != null && this.has(id) && this.has(id + 1)) return id + 1;
    return null;
  }

  set(id: number, value: V): boolean {
    if(!this.has(id)) return false;
    this._array[id] = value;
  }

  splice(prev: number, next: number, ...values: V[]): boolean {
    if(prev == null) prev = -1;
    else if(!this.has(prev)) return false;

    if(next == null) next = this._array.length;
    else if(!this.has(next)) return false;

    this._array.splice(prev + 1, next - prev - 1, ...values);
    this._invalidate(prev, null);
    return true;
  }
}

export default ArrayList;
