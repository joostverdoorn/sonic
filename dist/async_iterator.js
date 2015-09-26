import bind from './bind';
export class AsyncIterator {
    constructor(list, range = [null, null]) {
        this._list = list;
        this.range = range;
    }
    get() {
        return this._list.get(this.current);
    }
    prev() {
        return this._list.prev(this.current == null ? this.range[1] : this.current).then((prev) => {
            if (prev == this.range[0])
                return this.current = null;
            return this.current = prev;
        });
    }
    next() {
        return this._list.next(this.current == null ? this.range[0] : this.current).then((prev) => {
            if (prev == this.range[1])
                return this.current = null;
            return this.current = prev;
        });
    }
    static every(iterator, predicate) {
        return iterator.next()
            .then(key => key == null || iterator.get().then(value => predicate(value, key)).then(result => result ? AsyncIterator.every(iterator, predicate) : false));
    }
    static some(iterator, predicate) {
        return AsyncIterator.every(iterator, (value, key) => Promise.resolve(predicate(value, key)).then(result => !result)).then(result => !result);
    }
    static forEach(iterator, fn) {
        return AsyncIterator.every(iterator, (value, key) => Promise.resolve(fn(value, key)).then(() => true)).then(() => { });
    }
    static reduce(iterator, fn, memo) {
        return AsyncIterator.forEach(iterator, (value, key) => Promise.resolve(fn(memo, value, key)).then(value => { memo = value; })).then(() => memo);
    }
    static toArray(iterator) {
        return AsyncIterator.reduce(iterator, (memo, value) => (memo.push(value), memo), []);
    }
    static findKey(iterator, fn) {
        var key;
        return AsyncIterator.some(iterator, (v, k) => Promise.resolve(fn(v, k)).then(res => res ? (!!(key = k) || true) : false)).then(found => found ? key : null);
    }
    static find(iterator, fn) {
        return AsyncIterator.findKey(iterator, fn).then(bind(iterator.get, iterator));
    }
    static keyOf(iterator, value) {
        return AsyncIterator.findKey(iterator, v => v === value);
    }
    static indexOf(iterator, value) {
        var index = -1;
        return AsyncIterator.some(iterator, (v, k) => (index++, value == v)).then((found) => { if (found) {
            return index;
        }
        else {
            throw new Error();
        } });
    }
    static keyAt(iterator, index) {
        return AsyncIterator.findKey(iterator, () => 0 === index--);
    }
    static at(iterator, index) {
        return AsyncIterator.keyAt(iterator, index).then(bind(iterator.get, iterator));
    }
    static contains(iterator, value) {
        return AsyncIterator.some(iterator, v => v === value);
    }
}
export default AsyncIterator;
