export class ListIterator {
    constructor(list) {
        this._list = list;
        this._current = Promise.resolve(null);
    }
    next() {
        var done, value;
        return { done, value };
    }
}
export default ListIterator;
