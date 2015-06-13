import { List } from './list';
import { ObservableList } from './observable_list';
import { MutableList } from './mutable_list';
import Unit from './unit';
import ArrayList from './array_list';
export default function factory(obj) {
    if (MutableList.isMutableList(obj))
        return MutableList.create(obj);
    if (ObservableList.isObservableList(obj))
        return ObservableList.create(obj);
    if (List.isList(obj))
        return List.create(obj);
    if (Array.isArray(obj))
        return new ArrayList(obj);
    return Unit.create(obj);
}
export function fromPromise(promise) {
    var unit = new Unit();
    promise.then((value) => {
        unit.push(value);
    });
    return ObservableList.create(unit);
}
export function fromIterator(iterator) {
    var list = {
        has: function (key) { return null; },
        get: function (key) { return null; },
        prev: function (key) { return null; },
        next: function (key) { return null; }
    };
    return list;
}
