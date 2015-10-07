import   Key           from './key';
import   Range         from './range';
import   State         from './state';
import   StateIterator from './state_iterator';
import { Observer,
         Observable,
         Disposable,
         Subject }     from './observable';
import { Patch }       from './patch';


function lazyPromise<T>(resolver: () => T | PromiseLike<T>): PromiseLike<T> {
  var value: T | PromiseLike<T>;

  return {
    then: <U>(onfulfilled?: (value: T) => U | PromiseLike<U>): Promise<U> => {
      return Promise.resolve(value === undefined ? value = resolver(): value).then(onfulfilled);
    }
  };
}

export interface List<V> extends Observable<V> {
  state: State<V>
  subscribe: (observer: Observer<Patch<V>>) => Disposable
}

export module List {
  export function map<V, W>(parent: List<V>, mapFn: (value: V, key: Key) => W): List<W> {
    var state = State.map(parent.state, mapFn),
        subject = new Subject(),
        list = {
          state: state,
          subscribe: subject.subscribe
        }

    Observable.map(parent, patch => {
      if (!patch.set) return Promise.resolve({delete: patch.delete});

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
        list.state = State.patch(list.state, patch)
        return subject.onNext(patch)
      }
    });

    return list;
  }

  export function filter<V>(parent: List<V>, filterFn: (value: V, key: Key) => boolean): List<V> {
    var state = State.filter(parent.state, filterFn),
        observable = Observable.filter(parent, patch => {
          return patch.set ? patch.set.value.then(value => filterFn(value, patch.set.key)) : true;
        }),
        list = {
          state: state,
          subscribe: observable.subscribe
        }

      observable.subscribe({
        onNext: patch => {list.state = State.patch(list.state, patch)}
      });

      return list;
  }
}

export default List;
