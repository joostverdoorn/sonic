var list_1 = require('./list');
var mutable_list_1 = require('./mutable_list');
var unit_1 = require('./unit');
var array_list_1 = require('./array_list');
// export default function factory<V,I>(obj: IMutableList<V,I>): MutableList<V,I>;
// export default function factory<V,I>(obj: IList<V,I>): List<V,I>;
// export default function factory<V>(obj: V[]): ArrayList<V>;
// export default function factory<V>(obj: V): Unit<V>;
function factory(obj) {
    if (mutable_list_1.default.isMutableList(obj))
        return mutable_list_1.default.create(obj);
    if (list_1.default.isList(obj))
        return list_1.default.create(obj);
    if (Array.isArray(obj))
        return array_list_1.default.create(obj);
    return unit_1.default.create(obj);
}
exports.default = factory;
