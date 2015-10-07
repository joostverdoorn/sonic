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
  var DELETED: any = Promise.resolve({});

  export function cache<V>(parent: List<V>): List<V> {
    function getState(_get: {[key: string]: Promise<V>}, _prev: {[key: string]: Key}, _next: {[key: string]: Key}) {
      return {
        get: (key: Key): Promise<V> => {
          if (_get[key] == DELETED) return Promise.reject<V>(new Error);
          return _get[key] === undefined ? (_get[key] = parent.state.get(key)): _get[key];
        },
        prev: (key: Key): Promise<Key> => {
          return _prev[key] === undefined ? (parent.state.prev(key).then((res) => (_next[res] = key, _prev[key] = res))) : Promise.resolve(_prev[key]);
        },
        next: (key: Key): Promise<Key> => {
          return _next[key] === undefined ? (parent.state.next(key).then((res) => (_prev[res] = key, _next[key] = res))) : Promise.resolve(_next[key]);
        }
      }
    }

    var subject = new Subject(),
        pseudoState: {
          get : {[key: string]: Promise<V>}
          prev: {[key: string]: Key}
          next: {[key: string]: Key}
        } = {
          get : Object.create(null),
          prev: Object.create(null),
          next: Object.create(null)
        },
        list = {
          get state(): State<V> {
            return getState(pseudoState.get, pseudoState.prev, pseudoState.next);
          },
          subscribe: subject.subscribe
        }

    parent.subscribe({
      onNext: patch => {
        return Promise.resolve().then((): Promise<any> => {
            var state = list.state;
            pseudoState = {
              get: Object.create(pseudoState.get),
              prev:Object.create(pseudoState.prev),
              next:Object.create(pseudoState.next)
            }

            if (Patch.isSetPatch(patch)) {
              pseudoState.get[patch.key] = Promise.resolve(patch.value);

              if (patch.before !== undefined) return state.prev(patch.before).then( prev => {
                var next = patch.before;

                pseudoState.prev[next] = patch.key;
                pseudoState.next[patch.key] = next;

                pseudoState.prev[patch.key] = prev;
                pseudoState.next[prev] = patch.key;

              });
            }

            if (Patch.isDeletePatch(patch)) {
              pseudoState.get[patch.key] = DELETED;

              return state.prev(patch.key)
                .then(prev => list.state.next(patch.key)
                  .then(next =>
                    (pseudoState.prev[next] = prev, pseudoState.next[prev] = next)
                  )
                );
            }
          }).then( () => subject.onNext(patch));
      }
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

    return factory.create(state, observable);
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

    return factory.create(state, observable);
  }

  export function zoom<V>(parent: List<V>, key: Key): List<V> {
    var state = State.zoom(parent.state, key),
        observable = Observable.filter(parent, patch => patch.key === key);

    return factory.create(state, observable);
  }

  export function reverse<V>(parent: List<V>): List<V> {
    var state = State.reverse(parent.state),
        list: List<V>,
        observable = Observable.map<Patch<V>, Patch<V>>(parent, patch => {
          if (!Patch.isSetPatch(patch)) return patch;
          else return patch.before === undefined ? patch : list.state.next(patch.before).then(prev => {
            return {
              operation: Patch.SET,
              key: patch.key,
              value: patch.value,
              before: prev
            }
          });
        });

    return list = create(state, observable);
  }
}

export module factory {
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
}

export default List;
