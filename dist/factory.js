export var factory;
(function (factory) {
    function fromArray(values) {
        return {
            get: (key) => {
                if (key in values)
                    return Promise.resolve(values[key]);
                return Promise.reject(new Error);
            },
            prev: (key) => {
                var index = key == null ? values.length - 1 : key - 1;
                return Promise.resolve(index == -1 ? null : index);
            },
            next: (key) => {
                var index = key == null ? 0 : key + 1;
                return Promise.resolve(index == values.length ? null : index);
            }
        };
    }
    factory.fromArray = fromArray;
    function fromObject(values) {
        var keys = Object.keys(values), indexByKey = {
            "null": -1,
        };
        return {
            get: (key) => {
                if (key in values)
                    return Promise.resolve(values[key]);
                return Promise.reject(new Error);
            },
            prev: (key) => {
                var index = key == null ? keys.length - 1 : indexByKey[key] - 1;
                indexByKey[keys[index]] = index;
                if (key == null)
                    return Promise.resolve(keys[keys.length - 1]);
                if (!(key in values))
                    return Promise.reject(new Error);
                return Promise.resolve(index == -1 ? null : keys[index]);
            },
            next: (key) => {
                var index = indexByKey[key] + 1;
                indexByKey[keys[index]] = index;
                if (key == null)
                    return Promise.resolve(keys[0]);
                if (!(key in values))
                    return Promise.reject(new Error);
                return Promise.resolve(index == keys.length ? null : keys[index]);
            }
        };
    }
    factory.fromObject = fromObject;
})(factory || (factory = {}));
export default factory;
