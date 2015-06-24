import Key from './key';
import { IList, List } from './list';

export class Index<V> implements IList<V> {
  protected _byIndex: Key[];
  protected _list: IList<V>;

  constructor(list: IList<V>) {
    this._byIndex = [];
    this._list = list;
  }

  protected _add = (key: Key, index: number) => {
    this._byIndex[index] = key;
  }

  get = (index: number): Promise<V> => {
    if(0 <= index && index < this._byIndex.length) return this._list.get(this._byIndex[index]);
    return List.find(this, (value, key) => key === index, this._byIndex.length - 1);
  }

  prev = (index: number): Promise<number> => {
    if(index != null && 0 <= index && index < this._byIndex.length) return Promise.resolve(index - 1 < 0 ? null : index - 1);
    return List.some(this, (value, key) => key === index - 1, this._byIndex.length - 1).then(found => {
      if(found) return index - 1;
      if(index == null) return this._byIndex.length - 1;
      throw new Error;
    });
  }

  next = (index: number): Promise<number> => {
    var next = index == null ? 0 : index + 1;

    if(next < this._byIndex.length) return Promise.resolve(next);
    return List.some(this._list, (value, key) => {
      this._add(key, this._byIndex.length);
      return next === this._byIndex.length - 1;
    }, this._byIndex[this._byIndex.length - 1]).then(found => {
      if(found) return next;
      if(next === this._byIndex.length) return null;
      throw new Error;
    });
  }
}

export default Index;
