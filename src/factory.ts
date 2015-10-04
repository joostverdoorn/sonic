import Key   from './key';
import State from './state';

export module factory {
  export function fromArray<V>(values: V[]): State<V> {
    return {
      get: (key: Key): Promise<V> => {
        if (key in values) return Promise.resolve(values[key])
        return Promise.reject<V>(new Error);
      },
      prev: (key: number): Promise<Key> => {
        var index = key == null ? values.length - 1 : key - 1;

        return Promise.resolve(index == -1 ? null : index);
      },
      next: (key: number): Promise<Key> => {
        var index = key == null ? 0 : key + 1;

        return Promise.resolve(index == values.length ? null : index);
      }
    }
  }
  export function fromObject<V>(values: {[key: string]: V}): State<V> {
    var keys = Object.keys(values),
      indexByKey = {
        "null": -1,
      };

    return {
      get: (key: Key): Promise<V> => {
        if (key in values) return Promise.resolve(values[key])
        return Promise.reject<V>(new Error);
      },
      prev: (key: Key): Promise<Key> => {
        var index = key == null ? keys.length - 1 : indexByKey[key] - 1;
        indexByKey[keys[index]] = index;

        if (key == null) return Promise.resolve(keys[keys.length - 1]);
        if (!(key in values)) return Promise.reject<Key>(new Error);

        return Promise.resolve(index == -1 ? null : keys[index]);
      },
      next: (key: Key): Promise<Key> => {
        var index = indexByKey[key] + 1;
        indexByKey[keys[index]] = index;

        if (key == null) return Promise.resolve(keys[0]);
        if (!(key in values)) return Promise.reject<Key>(new Error);

        return Promise.resolve(index == keys.length ? null : keys[index]);
      }
    }
  }
}

export default factory;
