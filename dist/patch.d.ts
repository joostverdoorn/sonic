import Key from './key';
export interface Patch<V> {
    operation: string;
    key: Key;
}
export interface DeletePatch<V> extends Patch<V> {
}
export interface SetPatch<V> extends Patch<V> {
    key: Key;
    value: V;
    before?: Key;
}
export declare module Patch {
    const SET: string;
    const DELETE: string;
    function setPatch<V>(key: Key, value: V, before?: Key): SetPatch<V>;
    function deletePatch<V>(key: Key): DeletePatch<V>;
    function isSetPatch<V>(patch: Patch<V>): patch is SetPatch<V>;
    function isDeletePatch<V>(patch: Patch<V>): patch is DeletePatch<V>;
}
export default Patch;
