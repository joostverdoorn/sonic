import State from './state';
import List from './list';
import { Patch } from './patch';
import { Observable, Observer } from './observable';
export interface Mutable<V> extends List<V> {
    patches: (Observable<Patch<V>> & Observer<Patch<V>>);
}
export declare module Mutable {
    function create<V>(state: State<V>, patches: (Observable<Patch<V>> & Observer<Patch<V>>), reducer?: (state: State<V>, patch: Patch<V>) => State<V>): Mutable<V>;
}
export default Mutable;
