import Key from './key';
import { IList } from './list';

export class Index<V> implements IList<V> {
  protected _byIndex: Key[];
  protected _list: IList<V>;

  constructor(list: IList<V>) {
    this._byIndex = [];
    this._list = list;
  }

  has = (index: number): boolean => {
    if(index >= 0 && index < this._byIndex.length) return true;

    var next: Key,
        last = this._byIndex.length - 1;

    while(last != index) {
      next = this._list.next(this._byIndex[last]);
      if(next == null) return false;
      this._byIndex[++last] = next;
    }

    return true;
  }

  get = (index: number): V => {
    return this.has(index) ? this._list.get(this._byIndex[index]) : undefined;
  }

  prev = (index: number): number => {
    if(this.has(index - 1)) return index - 1;
    if(index == null && this._byIndex.length) return this._byIndex.length - 1;
    return null;
  }

  next = (index: number = -1): number => {
    if(this.has(index + 1)) return index + 1;
    return null;
  }
}

export default Index;
