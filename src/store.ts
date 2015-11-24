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
import { NotFound }    from './exceptions';


export interface Store<V> {
  state: State<V>
  dispatcher: Observable<Patch<V>>
}

export interface MutableStore<V> extends Store<V> {
  dispatcher: Subject<Patch<V>>
}

export module Store {
  export function map<V, W>(parent: Store<V>, mapFn: (value: V, key: Key) => W | Promise<W>): Store<W> {
    var state = State.map(parent.state, mapFn),
        dispatcher = Observable.map(parent.dispatcher, patch => ({
          range: patch.range,
          added: patch.added ? State.map(patch.added, mapFn) : undefined
        }));

    return create(state, dispatcher);
  }

  export function filter<V>(parent: Store<V>, filterFn: (value: V, key: Key) => boolean | Promise<boolean>): Store<V> {
    var parentState = parent.state;

    async function find(state: State<V>, range: Range): Promise<Key> {
      try {
        var [key] = await AsyncIterator.find(State.entries(state, range), ([key, value]) => filterFn(value, key));
        return key;
      } catch (error) {
        if (error instanceof NotFound) return Key.sentinel;
        throw error;
      }
    }

    async function move(state: State<V>, range: Range): Promise<Position> {
      var deleted = State.slice(State.reverse(state), Range.reverse(range)),
          position = range[1];

      if (Position.isNextPosition(position)) {
        if (!(await State.empty(deleted))) return { next: await find(deleted, Range.all) };
        if (position.next === Key.sentinel) return { next: Key.sentinel };
      }

      return { prev: await find(state, [position, {next: Key.sentinel}]) };
    }

    var dispatcher = Observable.map(parent.dispatcher, async (patch) => {
      var range = <Range> (await Promise.all([
        move(State.reverse(parentState), Range.reverse(patch.range)).then(Position.reverse),
        move(parentState, patch.range)
      ]));

      parentState = parent.state;

      return {
        range: range,
        added: patch.added ? State.filter(patch.added, filterFn) : undefined
      };
    });

    return create(State.filter(parent.state, filterFn), dispatcher);
  }

  export function zoom<V>(parent: Store<V>, key: Key): Store<V> {
    var parentState = parent.state,
        state   = State.zoom(parent.state, key),
        dispatcher = Observable.map(
          Observable.filter(parent.dispatcher, patch => {
            return AsyncIterator.some(State.entries(parentState, patch.range), entry => entry[0] === key)
              .then(res => patch.added ? State.has(patch.added, key) : res)
          })
        , patch => {
          parentState = parent.state;
          return {
            range: Range.all,
            added: patch.added ? State.zoom(patch.added, key) : undefined
          }
        });

    return create(state, dispatcher);
  }

  export function flatten<V>(parent: Store<Store<V>>): Store<V> {
    var dispatcher_ = Subject.create();
    var parent_ = cache(map(parent, ((store, key) => {
      Observable.map(store.dispatcher, patch => {
        var from = patch.range[0],
            to   = patch.range[1];

        function mapPrevPosition(position: PrevPosition): Promise<Position> {
          if (position.prev === Key.sentinel) return store.state.prev(Key.sentinel).then(next => ({next: Path.toKey([key, next])}));
          return Promise.resolve({prev: Path.toKey([key, position.prev])});
        }

        function mapNextPosition(position: NextPosition): Promise<Position> {
          if (position.next === Key.sentinel) return store.state.next(Key.sentinel).then(prev => ({prev: Path.toKey([key, prev])}));
          return Promise.resolve({next: Path.toKey([key, position.next])});
        }

        return Promise.all([
          Position.isNextPosition(from) ? mapNextPosition(from) : mapPrevPosition(from),
          Position.isNextPosition(to)   ? mapNextPosition(to)   : mapPrevPosition(to)
        ]).then((range: Range) => ({ range: range, added: patch.added ? patch.added : undefined }));
      }).subscribe(dispatcher_);

      return store.state;
    })));

    Observable.map(parent.dispatcher, patch => {
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
      ]).then((range: Range) => ({ range: range, added: patch.added ? State.flatten(State.map(patch.added, store => store.state)) : undefined }));
    }).subscribe(dispatcher_);

    var state = State.flatten(parent_.state);

    return create(state, dispatcher_);
  }
  //
  // export function keyBy<V>(parent: Store<V>, keyFn: (value: V, key: Key) => Key): Store<V> {
  //   var state   = State.keyBy(parent.state, keyFn),
  //       parentState = parent.state,
  //       dispatcher = Observable.map(parent.dispatcher, (patch) => {
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
  //   return create(state, dispatcher);
  // }

  export function scan<V, W>(parent: Store<V>, scanFn: (memo: W, value: V) => W | Promise<W>, memo?: W): Store<W> {
    var store: Store<W>,
        state = State.scan(parent.state, scanFn, memo),
        dispatcher = Observable.map(parent.dispatcher, async (patch) => {
          var parentState = parent.state,
              storeState = store.state,
              [from, to] = patch.range;

          var added = State.lazy(async () => {
            var last = await State.last(storeState, [{next: null}, from]);
            return State.scan(State.slice(parentState, [{next: last}, {prev: null}]), scanFn, last !== Key.sentinel ? await storeState.get(last) : memo);
          });

          return { range: <Range> [from, {prev: null}], added };
        });

    return store = create(state, dispatcher);
  }

  export function take<V>(parent: Store<V>, count: number) {
    var store: Store<V>,
        state = State.take(parent.state, count);

    var indexed = Store.scan(parent, ([index], value) => <[number, V]>[index + 1, value], <[number, V]>[-1, null]);

    var dispatcher = Observable.map(indexed.dispatcher, async (patch) => {
      var [from] = patch.range,
          parentState = parent.state,
          indexedState = indexed.state;

      var key = await State.last(indexedState, [{next: null}, from]);
      var index = key === Key.sentinel ? -1 : (await indexedState.get(key))[0];

      return {
        range: patch.range,
        added: State.take(State.map(patch.added, ([index, value]) => value), count - (index + 1))
      }
    });

    return create(state, dispatcher);
  }

  export function cache<V>(parent: Store<V>): Store<V> {
    var state = State.cache(parent.state),
        dispatcher = Observable.map(parent.dispatcher, patch => ({
          range: patch.range,
          added: patch.added ? State.cache(patch.added) : undefined
        }));

    return Store.create(state, dispatcher);
  }

  export function states<V>(store: Store<V>): Observable<State<V>> {
    return Observable.map(store.dispatcher, () => store.state);
  }

  export function create<V>(state: State<V>, dispatcher: Subject<Patch<V>>, reducer?: (state: State<V>, patch: Patch<V>) => State<V> | Promise<State<V>>): MutableStore<V>
  export function create<V>(state: State<V>, dispatcher: Observable<Patch<V>>, reducer?: (state: State<V>, patch: Patch<V>) => State<V> | Promise<State<V>>): Store<V>
  export function create<V>(state: State<V>, dispatcher: Observable<Patch<V>>, reducer: (state: State<V>, patch: Patch<V>) => State<V> | Promise<State<V>> = Patch.apply): any {

    var subject = Subject.create();


    Observable.scan(dispatcher, async (state, patch) => {
      store.state = await reducer(state, patch);
      await subject.onNext(patch);
      return store.state;
    }, state);

    var store = { state, dispatcher: { subscribe: subject.subscribe, onNext: Subject.isSubject(dispatcher) ? dispatcher.onNext : undefined }};
    return store;
  }
}

export default Store;
