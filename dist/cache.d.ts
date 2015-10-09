import State from './state';
import List from './list';
import Patch from './patch';
import { Observable } from './observable';
export declare function cache<V>(parent: State<V>, patches: Observable<Patch<V>>): List<V>;
export default cache;
