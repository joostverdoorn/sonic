import   Key           from './key';
import   Patch         from './patch';
import   State         from './state';
import   Cache         from './cache';
import { Range,
         PrevPosition,
         NextPosition,
         Position }    from './range';
import { Tree,
         Path }        from './tree';
import { Observable,
         Subject }     from './observable';
import   AsyncIterator from './async_iterator';


export interface List<V> {
  state: State<V>
  patches: Observable<Patch<V>>
}

export module List {
  export function map<V, W>(parent: List<V>, mapFn: (value: V, key: Key) => W | Promise<W>): List<W> {
    var state = State.map(parent.state, mapFn),
        patches = Observable.map<Patch<V>, Patch<W>>(parent.patches, patch => {
          return {
            range: patch.range,
            added: patch.added ? State.map(patch.added, mapFn) : undefined
          };
        });

    return create(state, patches);
  }

  export function filter<V>(parent: List<V>, filterFn: (value: V, key: Key) => boolean): List<V> {
    var list: List<V>,
        state = State.filter(parent.state, filterFn),
        patches = Observable.map(parent.patches, patch => {
          var from = patch.range[0],
              to   = patch.range[1];

          return Promise.all<Position>([
            AsyncIterator.findKey(State.toIterator(State.reverse(state), [Position.isPrevPosition(from) ? {next: from.prev} : {prev: from.next}, {prev: null}]), filterFn)
              .then(next => ({next}), reason => reason === Key.NOT_FOUND_ERROR ? {next: Key.sentinel} : Promise.reject(reason)),

            AsyncIterator.findKey(State.toIterator(state, [to, {prev: null}]), filterFn)
              .then(prev => ({prev}), reason => reason === Key.NOT_FOUND_ERROR ? {prev: Key.sentinel} : Promise.reject(reason)),
          ]).then((range: Range) => ({
            range: range,
            added: patch.added == undefined ? undefined : State.filter(patch.added, filterFn)
          }));
        });

    return list = create(state, patches, (oldState, patche) => state = Patch.apply(oldState, patche));
  }

  export function zoom<V>(parent: List<V>, key: Key): List<V> {
    var parentState = parent.state,
        state   = State.zoom(parent.state, key),
        patches = Observable.map(
          Observable.filter(parent.patches, patch => {
            return AsyncIterator.some(State.toIterator(parentState, patch.range), (value, k) => k === key)
              .then(res => patch.added ? State.has(patch.added, key) : res)
          })
        , patch => {
          parentState = parent.state;
          return {
            range: Range.all,
            added: patch.added ? State.zoom(patch.added, key) : undefined
          }
        });

    return create(state, patches);
  }

  export function flatten<V>(parent: List<List<V>>): List<V> {
    var patches_ = Subject.create();
    var parent_ = cache(map(parent, ((list, key) => {
      Observable.map(list.patches, patch => {
        var from = patch.range[0],
            to   = patch.range[1];

        function mapPrevPosition(position: PrevPosition): Promise<Position> {
          if (position.prev === Key.sentinel) return list.state.prev(Key.sentinel).then(next => ({next: Path.toKey([key, next])}));
          return Promise.resolve({prev: Path.toKey([key, position.prev])});
        }

        function mapNextPosition(position: NextPosition): Promise<Position> {
          if (position.next === Key.sentinel) return list.state.next(Key.sentinel).then(prev => ({prev: Path.toKey([key, prev])}));
          return Promise.resolve({next: Path.toKey([key, position.next])});
        }

        return Promise.all([
          Position.isNextPosition(from) ? mapNextPosition(from) : mapPrevPosition(from),
          Position.isNextPosition(to)   ? mapNextPosition(to)   : mapPrevPosition(to)
        ]).then((range: Range) => ({ range: range, added: patch.added ? patch.added : undefined }));
      }).subscribe(patches_);

      return list.state;
    })));

    Observable.map(parent.patches, patch => {
      var from = patch.range[0],
          to   = patch.range[1];

      function mapPrevPosition(position: PrevPosition): Promise<Position> {
        return position.prev === Key.sentinel ? Promise.resolve({prev: Key.sentinel}) : Tree.next(parent_.state, [position.prev]).then(Path.toKey).then(prev => ({prev}));
      }

      function mapNextPosition(position: NextPosition): Promise<Position> {
        return position.next === Key.sentinel ? Promise.resolve({next: Key.sentinel}) : Tree.prev(parent_.state, [position.next]).then(Path.toKey).then(next => ({next}));
      }

      return Promise.all([
        Position.isNextPosition(from) ? mapNextPosition(from) : mapPrevPosition(from),
        Position.isNextPosition(to)   ? mapNextPosition(to)   : mapPrevPosition(to)
      ]).then((range: Range) => ({ range: range, added: patch.added ? State.flatten(State.map(patch.added, list => list.state)) : undefined }));
    }).subscribe(patches_);

    var state = State.flatten(parent_.state);

    return create(state, patches_);
  }
  //
  // export function keyBy<V>(parent: List<V>, keyFn: (value: V, key: Key) => Key): List<V> {
  //   var state   = State.keyBy(parent.state, keyFn),
  //       parentState = parent.state,
  //       patches = Observable.map(parent.patches, (patch) => {
  //         parentState = parent.state;
  //
  //         return Promise.all([
  //           patch.range[0] == Key.sentinel ? Promise.resolve(Key.sentinel) : parentState.get(patch.range[0]).then(value => keyFn(value, patch.range[0])),
  //           patch.range[1] == Key.sentinel ? Promise.resolve(Key.sentinel) : parentState.get(patch.range[1]).then(value => keyFn(value, patch.range[1]))
  //         ]).then((range: Range) => { return { range: range, added: patch.added ? State.keyBy(patch.added, keyFn) : undefined }});
  //       });
  //       // reducer = (state: State<V>, patch: Patch<V>) => {
  //       // };
  //
  //   return create(state, patches);
  // }

  export function cache<V>(parent: List<V>): List<V> {
    var state = State.cache(parent.state),
        patches = Observable.map(parent.patches, patch => {
          return {
            range: patch.range,
            added: State.cache(patch.added)
          }
        });

    return List.create(state, patches);
  }

  export function create<V>(state: State<V>, patches: Observable<Patch<V>>, reducer: (state: State<V>, patch: Patch<V>) => State<V> = Patch.apply): List<V> {
    const list = { state, patches };

    Observable.scan(patches, reducer, state).subscribe({
      onNext: (state: State<V>) => {list.state = state}
    });

    return list;
  }
}

export default List;
