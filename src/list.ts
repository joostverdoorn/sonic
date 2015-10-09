import   Key          from './key';
import   Patch        from './patch';
import   State        from './state';
import   Cache        from './cache';
import { Observable } from './observable';

export interface List<V> {
  state: State<V>
  patches: Observable<Patch<V>>
}

export module List {
  export function map<V, W>(parent: List<V>, mapFn: (value: V, key: Key) => W | Promise<W>): List<W> {
    var state = State.map(parent.state, mapFn),
        patches = Observable.map<Patch<V>, Patch<W>>(parent.patches, patch => {
          if (Patch.isSetPatch(patch))
            return Promise.resolve(mapFn(patch.value, patch.key)).then((result: W) => Patch.setPatch(patch.key, result, patch.before));
          return patch;
        });

    return create(state, patches);
  }

  export function filter<V>(parent: List<V>, filterFn: (value: V, key: Key) => boolean): List<V> {
    var state = State.filter(parent.state, filterFn),
        patches = Observable.map(parent.patches, patch => {
          if (Patch.isSetPatch(patch)) return Promise.resolve(filterFn(patch.value, patch.key)).then(result => result ? patch : Patch.deletePatch(patch.key));
          return patch;
        });

    return create(state, patches);
  }

  export function zoom<V>(parent: List<V>, key: Key): List<V> {
    var state   = State.zoom(parent.state, key),
        patches = Observable.filter(parent.patches, patch => patch.key === key);

    return create(state, patches);
  }

  // export function keyBy<V>(parent: List<V>, keyFn: (value: V, key: Key) => Key): List<V> {
  //   var state   = State.keyBy(parent.state, keyFn),
  //       reducer = (state: State<V>, patch: Patch<V>) => {
  //
  //       };
  //
  //   return create(state, patches, reducer);
  // }

  export function cache<V>(parent: List<V>): List<V> {
    var cache = Cache.create(),
        state = Cache.apply(cache, parent.state),
        reducer = (state: State<V>, patch: Patch<V>): State<V> => {
          cache = Cache.patch(cache, patch);
          return Cache.apply(cache, parent.state);
        }

    return List.create(state, parent.patches, reducer);
  }

  export function create<V>(state: State<V>, patches: Observable<Patch<V>>, reducer: (state: State<V>, patch: Patch<V>) => State<V> = State.patch): List<V> {
    const list = { state, patches };

    Observable.scan(patches, reducer, state).subscribe({
      onNext: (state: State<V>) => {list.state = state}
    });

    return list;
  }
}

export default List;
