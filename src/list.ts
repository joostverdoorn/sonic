import   Key          from './key';
import   Patch        from './patch';
import   State        from './state';
import   Cache        from './cache';
import   Range        from './range';
import { Tree,
         Path }       from './tree';
import { Observable,
         Subject }    from './observable';

export interface List<V> {
  state: State<V>
  patches: Observable<Patch<V>>
}

export module List {
  export function map<V, W>(parent: List<V>, mapFn: (value: V, key: Key) => W | Promise<W>): List<W> {
    var state = State.map(parent.state, mapFn),
        patches = Observable.map<Patch<V>, Patch<W>>(parent.patches, patch => {
          return { range: patch.range, added: patch.added ? State.map(patch.added, mapFn) : undefined };
        });

    return create(state, patches);
  }

  export function filter<V>(parent: List<V>, filterFn: (value: V, key: Key) => boolean): List<V> {
    var state = State.filter(parent.state, filterFn),
        patches = Observable.map(parent.patches, patch => {
          return Promise.all([
            patch.range[0] == null ? Promise.resolve(null) : state.get(patch.range[0]).then(value => patch.range[0])
              .catch(reason => reason === Key.NOT_FOUND_ERROR ? state.prev(patch.range[0]): Promise.reject(reason)),
            patch.range[1] == null ? Promise.resolve(null) : state.get(patch.range[1]).then(value => patch.range[1])
              .catch(reason => reason === Key.NOT_FOUND_ERROR ? state.next(patch.range[1]): Promise.reject(reason)),
          ]).then((range: Range) => { return { range: range, added: patch.added ? State.filter(patch.added, filterFn) : undefined }});
        });

    function reduceFn(old: State<V>, patch: Patch<V>) {
      return state = Patch.apply(patch, old);
    }

    return create(state, patches, reduceFn);
  }

  export function zoom<V>(parent: List<V>, key: Key): List<V> {
    var state   = State.zoom(parent.state, key),
        patches = Observable.filter(parent.patches, patch => state.get(key).then(
          () => true,
          reason => reason === Key.NOT_FOUND_ERROR ? false : Promise.reject(reason)
        ));

    function reduceFn(old: State<V>, patch: Patch<V>) {
      return state = Patch.apply(patch, old);
    }


    return create(state, patches, reduceFn);
  }

  export function flatten<V>(parent: List<List<V>>): List<V> {
    var xpatches = new Subject;
    var xparent = cache(map(parent, ((list, key) => {
      Observable.map(list.patches, patch => {
        if (Patch.isSetPatch(patch) && 'before' in patch) {
          if (patch.before !== null) return Patch.extend(patch, { key: Path.toKey([key, patch.key]), before: Path.toKey([key, patch.before]) });
          return Tree.next(State.map(parent.state, list => list.state), [key, patch.key])
                     .then(next => Patch.extend(patch, { key: Path.toKey([key, patch.key]), before: Path.toKey(next) }));
        }
        return Patch.extend(patch, { key: Path.toKey([key, patch.key]) });
      }).subscribe(xpatches);

      return list.state;
    })));
    var state = State.flatten(xparent.state);

    return create(state, xpatches);
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
