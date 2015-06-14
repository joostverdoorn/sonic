export class AsyncList {
    constructor(list, scheduler) {
        this.has = (key) => {
            return new Promise((resolve, reject) => {
                this._scheduler(() => {
                    Promise.resolve(this._list.has(key))
                        .then(resolve)
                        .catch(reject);
                });
            });
        };
        this.get = (key) => {
            return new Promise((resolve, reject) => {
                this.has(key)
                    .then(has => has ? resolve(this._list.get(key)) : reject())
                    .catch(reject);
            });
        };
        this.prev = (key) => {
            return new Promise((resolve, reject) => {
                this._scheduler(() => {
                    Promise.resolve(this._list.prev(key))
                        .then(prev => prev != null ? resolve(prev) : reject())
                        .catch(reject);
                });
            });
        };
        this.next = (key) => {
            return new Promise((resolve, reject) => {
                this._scheduler(() => {
                    Promise.resolve(this._list.next(key))
                        .then(prev => prev != null ? resolve(prev) : reject())
                        .catch(reject);
                });
            });
        };
        this._list = list;
        this._scheduler = scheduler || window.setTimeout;
    }
    static create(list) {
        return new AsyncList(list);
    }
    static map(list, mapFn) {
        var { has, prev, next } = list;
        function get(key) {
            return list.get(key).then(mapFn);
        }
        return new AsyncList({ has, get, prev, next });
    }
}
export default AsyncList;
