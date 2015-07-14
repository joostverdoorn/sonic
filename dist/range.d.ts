import Key from './key';
import { IList } from './list';
export declare type Range = Key | [Key, Key];
export declare module Range {
    function prev(list: IList<any>, range?: Range): Promise<Key>;
    function next(list: IList<any>, range?: Range): Promise<Key>;
    function first(list: IList<any>, range?: Range): Promise<Key>;
    function last(list: IList<any>, range?: Range): Promise<Key>;
}
export default Range;
