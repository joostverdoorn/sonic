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


export interface Store<K, V> {
  state: State<K, V>
  dispatcher: Observable<Patch<K, V>>
}

export interface MutableStore<K, V> extends Store<K, V> {
  dispatcher: Subject<Patch<K, V>, Patch<K, V>>
}

export module Store {
  export function reverse<K, V>(parent: Store<K, V>): Store<K, V> {
    function getState() {
      return State.reverse(parent.state);
    }

    const dispatcher = Observable.map(parent.dispatcher, patch => ({
      range: Range.reverse(patch.range),
      added: patch.added ? State.reverse(patch.added) : undefined
    }));

    return create(getState(), dispatcher, getState);
  }

  export function map<K, V, W>(parent: Store<K, V>, mapFn: (value: V, key: K) => W | Promise<W>): Store<K, W> {
    function getState() {
      return State.map(parent.state, mapFn);
    }

    const dispatcher = Observable.map(parent.dispatcher, patch => ({
      range: patch.range,
      added: patch.added ? State.map(patch.added, mapFn) : undefined
    }));

    return create(getState(), dispatcher, getState);
  }

  export function filter<K, V>(parent: Store<K, V>, filterFn: (value: V, key: K) => boolean | Promise<boolean>): Store<K, V> {
    var parentState = parent.state;

    function getState() {
      return State.filter(parent.state, filterFn);
    }

    async function find(state: State<K, V>, range: Range<K>): Promise<K> {
      try {
        var [key] = await AsyncIterator.find(State.entries(state, range), ([key, value]) => filterFn(value, key));
        return key;
      } catch (error) {
        if (error instanceof NotFound) return Key.SENTINEL;
        throw error;
      }
    }

    async function move(state: State<K, V>, range: Range<K>): Promise<Position<K>> {
      var deleted = State.slice(State.reverse(state), Range.reverse(range)),
          position = range[1];

      if (Position.isNextPosition(position)) {
        if (!(await State.empty(deleted))) return { next: await find(deleted, Range.all) };
        if (position.next === Key.SENTINEL) return { next: Key.SENTINEL };
      }

      return { prev: await find(state, [position, {next: Key.SENTINEL}]) };
    }

    var dispatcher = Observable.map(parent.dispatcher, async (patch) => {
      var range = <Range<K>> (await Promise.all([
        move(State.reverse(parentState), Range.reverse<K>(patch.range)).then(Position.reverse),
        move(parentState, patch.range)
      ]));

      parentState = parent.state;

      return {
        range: range,
        added: patch.added ? State.filter(patch.added, filterFn) : undefined
      };
    });

    return create(getState(), dispatcher, getState);
  }

  export function zoom<K, V>(parent: Store<K, V>, key: K): Store<K, V> {
    var parentState = parent.state;

    function getState() {
      return State.zoom(parent.state, key);
    }

    const dispatcher = Observable.map(
      Observable.filter(parent.dispatcher, patch => State.has(State.slice(parentState, patch.range), key))
    , patch => {
      parentState = parent.state;
      return {
        range: Range.all,
        added: patch.added ? State.zoom(patch.added, key) : undefined
      }
    });

    return create(getState(), dispatcher, getState);
  }

  export function flatten<K, L, V>(parent: Store<K, Store<L, V>>): Store<[K, L], V> {
    var dispatcher_ = Subject.create();
    var parent_ = cache(map(parent, ((store, key) => {
      Observable.map(store.dispatcher, patch => {
        var from = patch.range[0],
            to   = patch.range[1];

        function mapPrevPosition(position: PrevPosition<L>): Promise<Position<[K, L]>> {
          if (position.prev === Key.SENTINEL) return store.state.prev(Key.SENTINEL).then(next => ({next: <Path<K, L>>[key, next]}));
          return Promise.resolve({prev: <Path<K, L>>[key, position.prev]});
        }

        function mapNextPosition(position: NextPosition<L>): Promise<Position<[K, L]>> {
          if (position.next === Key.SENTINEL) return store.state.next(Key.SENTINEL).then(prev => ({prev: <Path<K, L>>[key, prev]}));
          return Promise.resolve({next: <Path<K, L>>[key, position.next]});
        }

        return Promise.all([
          Position.isNextPosition(from) ? mapNextPosition(from) : mapPrevPosition(from),
          Position.isNextPosition(to)   ? mapNextPosition(to)   : mapPrevPosition(to)
        ]).then((range: Range<[K, L]>) => ({ range: range, added: patch.added ? patch.added : undefined }));
      }).subscribe(dispatcher_);

      return store.state;
    })));

    Observable.map(parent.dispatcher, patch => {
      var from = patch.range[0],
          to   = patch.range[1];

      function mapPrevPosition(position: PrevPosition<K>): Promise<Position<Path<K, L>>> {
        return position.prev === Key.SENTINEL ? Promise.resolve({prev: Key.SENTINEL}) : Tree.next(parent_.state, [position.prev, null]).then(prev => ({prev}));
      }

      function mapNextPosition(position: NextPosition<K>): Promise<Position<Path<K, L>>> {
        return position.next === Key.SENTINEL ? Promise.resolve({next: Key.SENTINEL}) : Tree.prev(parent_.state, [position.next, null]).then(next => ({next}));
      }

      return Promise.all([
        Position.isNextPosition(from) ? mapNextPosition(from) : mapPrevPosition(from),
        Position.isNextPosition(to)   ? mapNextPosition(to)   : mapPrevPosition(to)
      ]).then((range: Range<Path<K, L>>) => ({ range: range, added: patch.added ? State.flatten(State.map(patch.added, store => store.state)) : undefined }));
    }).subscribe(dispatcher_);

    var state = State.flatten(parent_.state);

    return create(state, dispatcher_);
  }

  export function flatMap<K, L, V, W>(parent: Store<K, V>, mapFn: (value: V, key: K) => Store<L, W>): Store<Path<K, L>, W> {
    return Store.flatten(Store.map(parent, mapFn));
  }

  export function keyBy<K, L, V>(parent: Store<K, V>, keyFn: (value: V, key: K) => L | Promise<L>, reverseKeyFn: (key: L) => K | Promise<K>): Store<L, V> {
    var state = State.keyBy(parent.state, keyFn, reverseKeyFn),
        parentState = parent.state,
        dispatcher = Observable.map(parent.dispatcher, async (patch) => {
          var [from, to] = patch.range;

          async function mapPosition(position: Position<K>): Promise<Position<L>> {
            if (Position.isPrevPosition(position)) {
              if (position.prev === Key.SENTINEL) return {prev: Key.SENTINEL};
              return {prev: await keyFn(await parentState.get(position.prev), position.prev)};
            } else {
              if (position.next === Key.SENTINEL) return {next: Key.SENTINEL};
              return {next: await keyFn(await parentState.get(position.next), position.next)};
            }
          }

          var range = <Range<L>>(await Promise.all([
            mapPosition(from),
            mapPosition(to)
          ]));

          parentState = parent.state;
          return { range, added: patch.added ? State.keyBy(patch.added, keyFn) : undefined };
        });

    return create(state, dispatcher);
  }

  export function scan<K, V, W>(parent: Store<K, V>, scanFn: (memo: W, value: V) => W | Promise<W>, memo?: W): Store<K, W> {
    function getState() {
      return State.scan(parent.state, scanFn, memo);
    }

    var store: Store<K, W>,
        dispatcher = Observable.map(parent.dispatcher, async (patch) => {
          var parentState = parent.state,
              storeState = store.state,
              [from, to] = patch.range;

          var added = State.lazy(async () => {
            var last = await State.last(storeState, [{next: null}, from]);
            return State.scan(State.slice(parentState, [{next: last}, {prev: null}]), scanFn, last !== Key.SENTINEL ? await storeState.get(last) : memo);
          });

          return { range: <Range<K>> [from, {prev: null}], added };
        });

    return store = create(getState(), dispatcher);
  }

  export function take<K, V>(parent: Store<K, V>, count: number) {
    var store: Store<K, V>,
        state = State.take(parent.state, count);

    var indexed = Store.scan(parent, ([index], value) => <[number, V]>[index + 1, value], <[number, V]>[-1, null]);

    var dispatcher = Observable.map(indexed.dispatcher, async (patch) => {
      var [from] = patch.range,
          parentState = parent.state,
          indexedState = indexed.state;

      var key = await State.last(indexedState, [{next: null}, from]);
      var index = key === Key.SENTINEL ? -1 : (await indexedState.get(key))[0];

      return {
        range: patch.range,
        added: State.take(State.map(patch.added, ([index, value]) => value), count - (index + 1))
      }
    });

    return create(state, dispatcher);
  }

  export function cache<K, V>(parent: Store<K, V>): Store<K, V> {
    return Store.create(State.cache(parent.state), parent.dispatcher, (state, patch) => {
      return State.cache(Patch.apply(state, patch));
    });
  }

  export function states<K, V>(store: Store<K, V>): Observable<State<K, V>> {
    return Observable.map(store.dispatcher, () => store.state);
  }

  export function create<K, V>(state: State<K, V>, dispatcher: Subject<Patch<K, V>, Patch<K, V>>, reducer?: (state: State<K, V>, patch: Patch<K, V>) => State<K, V> | Promise<State<K, V>>): MutableStore<K, V>
  export function create<K, V>(state: State<K, V>, dispatcher: Observable<Patch<K, V>>, reducer?: (state: State<K, V>, patch: Patch<K, V>) => State<K, V> | Promise<State<K, V>>): Store<K, V>
  export function create<K, V>(state: State<K, V>, dispatcher: Observable<Patch<K, V>>, reducer: (state: State<K, V>, patch: Patch<K, V>) => State<K, V> | Promise<State<K, V>> = Patch.apply): any {
    var subject = Subject.create();

    dispatcher.subscribe({
      onNext: async (patch) => {
        store.state = await reducer(store.state, patch);
        return subject.onNext(patch);
      }
    });

    const store = {
      state,
      dispatcher: {
        subscribe: subject.subscribe,
        onNext: Subject.isSubject(dispatcher) ? dispatcher.onNext : undefined
      }
    };

    return store;
  }
}

export default Store;
