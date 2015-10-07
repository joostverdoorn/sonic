import State from './state';
import { Observable, Subject } from './observable';
function lazyPromise(resolver) {
    var value;
    return {
        then: (onfulfilled) => {
            return Promise.resolve(value === undefined ? value = resolver() : value).then(onfulfilled);
        }
    };
}
export var List;
(function (List) {
    function map(parent, mapFn) {
        var state = State.map(parent.state, mapFn), subject = new Subject(), list = {
            state: state,
            subscribe: subject.subscribe
        };
        Observable.map(parent, patch => {
            if (!patch.set)
                return Promise.resolve({ delete: patch.delete });
            var value = Promise.resolve(lazyPromise(() => patch.set.value.then(value => mapFn(value, patch.set.key))));
            return {
                delete: patch.delete,
                set: {
                    key: patch.set.key,
                    value: value,
                    before: patch.set.before
                }
            };
        }).subscribe({
            onNext: patch => {
                list.state = State.patch(list.state, patch);
                return subject.onNext(patch);
            }
        });
        return list;
    }
    List.map = map;
    function filter(parent, filterFn) {
        var state = State.filter(parent.state, filterFn), observable = Observable.filter(parent, patch => {
            return patch.set ? patch.set.value.then(value => filterFn(value, patch.set.key)) : true;
        }), list = {
            state: state,
            subscribe: observable.subscribe
        };
        observable.subscribe({
            onNext: patch => { list.state = State.patch(list.state, patch); }
        });
        return list;
    }
    List.filter = filter;
})(List || (List = {}));
export default List;
