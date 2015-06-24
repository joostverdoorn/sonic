export class KeyBy {
    constructor(list, keyFn) {
        this.get = (key) => {
            return this.has(key) ? this._list.get(this._sourceKeyByKey[key]) : undefined;
        };
        this.prev = (key) => {
            if (this.has(key) || key == null)
                return this._keyBySourceKey[this._list.prev(this._sourceKeyByKey[key])];
        };
        this.next = (key = null) => {
            var sourceKey, sourceNext, res;
            if (key in this._sourceKeyByKey)
                sourceKey = this._sourceKeyByKey[key];
            else
                sourceKey = null;
            while (key != null && !(key in this._sourceKeyByKey)) {
                sourceKey = this._list.next(sourceKey);
                if (!(sourceKey in this._keyBySourceKey)) {
                    if (sourceKey == null)
                        return null;
                    res = this._keyFn(this._list.get(sourceKey), sourceKey);
                    this._keyBySourceKey[sourceKey] = res;
                    this._sourceKeyByKey[res] = sourceKey;
                    if (res == key)
                        break;
                }
            }
            sourceKey = this._list.next(sourceKey);
            if (sourceKey == null)
                return null;
            res = this._keyFn(this._list.get(sourceKey), sourceKey);
            this._keyBySourceKey[sourceKey] = res;
            this._sourceKeyByKey[res] = sourceKey;
            return res;
        };
        this._list = list;
        this._keyFn = keyFn;
        this._sourceKeyByKey = Object.create(null);
        this._keyBySourceKey = Object.create(null);
    }
}
export default KeyBy;
