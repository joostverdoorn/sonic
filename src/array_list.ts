import Key from './key';
import { Subject, ISubject, ISubscription } from './observable';
import { IListObserver } from './observable_list';
import { IMutableList, MutableList } from './mutable_list';

export default class ArrayList<V> extends MutableList<V> {
  private _array: V[];
  private _subject: ISubject<IListObserver>;

  constructor(array: V[] = []) {
    super();

    this._subject = new Subject();
    this._array = array;
  }

  has = (key: Key): boolean => {
    return key != null && -1 < key && key < this._array.length;
  }

  get = (key: number): V => {
    if(this.has(key)) return this._array[key];
    return;
  }

  prev = (key?: number): number => {
    if(key == null && this._array.length) return this._array.length - 1;
    if(this._array.length > 0 && key != null && this.has(key) && this.has(key - 1)) return key - 1;
    return null;
  }

  next = (key?: number): number => {
    if(key == null && this._array.length) return 0;
    if(this._array.length > 0 && key != null && this.has(key) && this.has(key + 1)) return key + 1;
    return null;
  }

  set = (key: number, value: V): Key => {
    if(!this.has(key)) return null;
    this._array[key] = value;
    return key;
  }

  splice = (prev: number, next: number, ...values: V[]): void => {
    if(prev == null) prev = -1;
    else if(!this.has(prev)) return;

    if(next == null) next = this._array.length;
    else if(!this.has(next)) return;

    this._array.splice(prev + 1, next - (prev + 1), ...values);
    this._invalidate(prev, null);
  }

  observe = (observer: IListObserver): ISubscription => {
    return this._subject.observe(observer);
  }

  private _invalidate = (prev?: Key, next?: Key) => {
    if(!this.has(prev)) prev = null;
    if(!this.has(next)) next = null;
    this._subject.notify(function(observer: IListObserver) {
      observer.onInvalidate(prev, next);
    })
  }
}
