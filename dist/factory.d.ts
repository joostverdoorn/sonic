import State from './state';
export declare module factory {
    function fromArray<V>(values: V[]): State<V>;
    function fromObject<V>(values: {
        [key: string]: V;
    }): State<V>;
}
export default factory;
