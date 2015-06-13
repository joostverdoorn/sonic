export class Index {
    constructor(list) {
        this.has = (index) => {
            if (index >= 0 && index < this._byIndex.length)
                return true;
            var next, last = this._byIndex.length - 1;
            while (last != index) {
                next = this._list.next(this._byIndex[last]);
                if (next == null)
                    return false;
                this._byIndex[++last] = next;
            }
            return true;
        };
        this.get = (index) => {
            return this.has(index) ? this._list.get(this._byIndex[index]) : undefined;
        };
        this.prev = (index) => {
            if (this.has(index - 1))
                return index - 1;
            if (index == null && this._byIndex.length)
                return this._byIndex.length - 1;
            return null;
        };
        this.next = (index = -1) => {
            if (this.has(index + 1))
                return index + 1;
            return null;
        };
        this._byIndex = [];
        this._list = list;
    }
}
export default Index;
