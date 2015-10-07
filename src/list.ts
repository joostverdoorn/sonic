import   Key           from './key';
import   Range         from './range';
import   State         from './state';
import   StateIterator from './state_iterator';
import { Observer,
         Observable,
         Disposable,
         Subject }     from './observable';
import { Patch }       from './patch';

export interface List<V> extends Observable<Patch<V>> {
  state: State<V>
  subscribe: (observer: Observer<Patch<V>>) => Disposable
}

export module List {
  export function create<V>(state: State<V>, observable: Observable<Patch<V>>): List<V> {
    var list = {
      state: state,
      subscribe: observable.subscribe
    }

    observable.subscribe({
      onNext: patch => {list.state = State.patch(list.state, patch)}
    });

    return list;
  }

  export function map<V, W>(parent: List<V>, mapFn: (value: V, key: Key) => W): List<W> {
    var state = State.map(parent.state, mapFn),
        observable = Observable.map<Patch<V>, Patch<W>>(parent, patch => {
          if (!Patch.isSetPatch(patch)) return patch;
          else return Promise.resolve(mapFn(patch.value, patch.key)).then((result: W) => {
            return {
              operation: Patch.SET,
              key: patch.key,
              value: result,
              before: patch.before
            }
          });
        });

    return create(state, observable);
  }

  export function filter<V>(parent: List<V>, filterFn: (value: V, key: Key) => boolean): List<V> {
    var state = State.filter(parent.state, filterFn),
        observable = Observable.map(parent, patch => {
          if (!Patch.isSetPatch(patch)) return patch;
          else return Promise.resolve(filterFn(patch.value, patch.key)).then(result => {
            if(result) return patch;
            return {
              operation: Patch.DELETE,
              key: patch.key
            }
          });
        });

    return create(state, observable);
  }

  export function zoom<V>(parent: List<V>, key: Key): List<V> {
    var state = State.zoom(parent.state, key),
        observable = Observable.filter(parent, patch => patch.key === key);

    return create(state, observable);
  }
}

export default List;
