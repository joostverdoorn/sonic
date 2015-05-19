import Id from './id';
import { Subject, ISubject, ISubscription } from './observable';
import { IListObserver } from './observable_list';
import MutableList from './mutable_list';


export class ArrayList<V> extends MutableList<V> {
  private _array: V[];
  private _subject: ISubject<IListObserver>;

  constructor(array: V[] = []) {
    super();

    this._subject = new Subject();
    this._array = array;
  }

  has = (id: Id): boolean => {
    return id != null && -1 < id && id < this._array.length;
  }

  get = (id: number): V => {
    if(this.has(id)) return this._array[id];
    return;
  }

  prev = (id?: number): number => {
    if(id == null && this._array.length) return this._array.length - 1;
    if(this._array.length > 0 && id != null && this.has(id) && this.has(id - 1)) return id - 1;
    return null;
  }

  next = (id?: number): number => {
    if(id == null && this._array.length) return 0;
    if(this._array.length > 0 && id != null && this.has(id) && this.has(id + 1)) return id + 1;
    return null;
  }

  set = (id: number, value: V): Id => {
    if(!this.has(id)) return null;
    this._array[id] = value;
    return id;
  }

  splice = (prev: number, next: number, ...values: V[]): void => {
    if(prev == null) prev = -1;
    else if(!this.has(prev)) return;

    if(next == null) next = this._array.length;
    else if(!this.has(next)) return;

    this._array.splice(prev + 1, next - prev - 1, ...values);
    this._invalidate(prev, null);
  }

  observe = (observer: IListObserver): ISubscription => {
    return this._subject.observe(observer);
  }

  private _invalidate = (prev?: Id, next?: Id) => {
    if(!this.has(prev)) prev = null;
    if(!this.has(next)) next = null;
    this._subject.notify(function(observer: IListObserver) {
      observer.onInvalidate(prev, next);
    })
  }
}

export default ArrayList;
