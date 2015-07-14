import Key from './key';
import { IList } from './list';

export type Range = Key | [Key, Key];

export module Range {
  export function prev(list: IList<any>, range: Range = [null, null]): Promise<Key> {
    if(Array.isArray(range)) return Promise.resolve(range[0]);
    else return list.prev(range);
  }

  export function next(list: IList<any>, range: Range = [null, null]): Promise<Key> {
    if(Array.isArray(range)) return Promise.resolve(range[1]);
    else return list.next(range);
  }

  export function first(list: IList<any>, range: Range = [null, null]): Promise<Key> {
    if(Array.isArray(range)) return list.next(range[0]);
    return Promise.resolve(range);
  }

  export function last(list: IList<any>, range: Range = [null, null]): Promise<Key> {
    if(Array.isArray(range)) return list.prev(range[1]);
    return Promise.resolve(range);
  }
}

export default Range;
