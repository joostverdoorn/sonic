import test          from 'blue-tape';
import State         from '../dist/state';
import AsyncIterator from '../dist/async_iterator';
import Entry         from '../dist/entry';

function slice(array, index, count) {
  return Array.prototype.slice.call(array, index, count);
}

function concat(array, other) {
  return Array.prototype.concat.call(array, other);
}

function state(object) {
  return Array.isArray(object) ? State.fromArray(object) : State.fromObject(object);
}

test('first', t => {
  var { first } = State;

  t.test('should resolve with the first element of the state', t => first(state({a: 3, b: 4, c: 5})).then(f => t.equal(f, 3)));
  t.test('should reject when the state is empty', t => first(state([])).then(t.fail, t.pass));
  t.test('should resolve with the first of a range when PrevPosition', t => first(state({a: 3, b: 4, c: 5}), [{prev: 'b'}, {next: 'c'}]).then(f => t.equal(f, 4)));
  t.test('should resolve with the first of a range when NextPosition', t => first(state({a: 3, b: 4, c: 5}), [{next: 'a'}, {next: 'c'}]).then(f => t.equal(f, 4)));
});

test('last', t => {
  var { last } = State;

  t.test('should resolve with the last element of the state', t => last(state({a: 3, b: 4, c: 5})).then(l => t.equal(l, 5)));
  t.test('should reject when the state is empty', t => last(state([])).then(t.fail, t.pass));
  t.test('should resolve with the last of a range when PrevPosition', t => last(state({a: 3, b: 4, c: 5}), [{prev: 'a'}, {prev: 'c'}]).then(l => t.equal(l, 4)));
  t.test('should resolve with the last of a range when NextPosition', t => last(state({a: 3, b: 4, c: 5}), [{prev: 'a'}, {next: 'b'}]).then(l => t.equal(l, 4)));
});

test('has', t => {
  var  { has } = State;

  t.test('should resolve with true when the state contains the key', t => State.has(state({a: 3, b: 4, c: 5}), 'c').then(t.ok));
  t.test('should resolve with false if the state doesnt contain the key', t => State.has(state({a: 3, b: 4, c: 5}), 'd').then(t.notOk));
});

test('is', t => {
  var { is } = State;

  t.test('should resolve with true if two states have the same keys and values', t => {
    var s = state({a: 3, b: 4, c: 5}),
        u = state({a: 3, b: 4, c: 5});

    t.test('s should be u', t => is(s, u).then(t.ok));
    t.test('u should be s', t => is(u, s).then(t.ok));
  });

  t.test('it should resolve with false of two states have the same keys but not the same values', t => {
    var s = state({a: 3, b: 4, c: 5}),
        u = state({a: 2, b: 4, c: 5});

    t.test('s shouldnt be u', t => is(s, u).then(t.notOk));
    t.test('u shouldnt be s', t => is(u, s).then(t.notOk));
  });

  t.test('it should resolve with false when two states differ in length', t => {
    var s = state({a: 3, b: 4, c: 5}),
        u = state({a: 3, b: 4, c: 5, d: 6});


    t.test('s shouldnt be u', t => is(u, s).then(t.notOk));
    t.test('u shouldnt be s', t => is(u, s).then(t.notOk));
  });
});

test('empty', t => {
  var { empty } = State;

  t.test('should resolve with true if the state has no entries', t => empty(state({})).then(t.ok));
  t.test('should resolve with false if the state has entries', t => empty(state({a: 3, b: 4, c: 5})).then(t.notOk));
});

test('any', t => {
  var { any } = State;

  t.test('should resolve with true if the state has entries', t => any(state({a: 3, b: 4, c: 5})).then(t.ok));
  t.test('should resolve with false if the state has no entries', t => any(state({})).then(t.notOk));
})

test('slice', t => {
  var { is, empty, slice } = State;
  var s = state({a: 3, b: 4, c: 5});

  t.test('should return the sliced array', t => {
    t.test('everything', t => is(slice(state({a: 3, b: 4, c: 5}), [{next: null}, {prev: null}]), state({a: 3, b: 4, c: 5})).then(t.ok));
    t.test('nothing',    t => is(slice(state({a: 3, b: 4, c: 5}), [{next: 'a'},  {prev: 'b'}]), state({})).then(t.ok));
    t.test('after a',    t => is(slice(state({a: 3, b: 4, c: 5}), [{next: 'a'},  {prev: null}]), state({b: 4, c: 5})).then(t.ok));
    t.test('until c',    t => is(slice(state({a: 3, b: 4, c: 5}), [{next: null}, {prev: 'c'}]), state({a: 3, b: 4})).then(t.ok));
    t.test('only b',     t => is(slice(state({a: 3, b: 4, c: 5}), [{prev: 'b'},  {next: 'b'}]), state({b: 4})).then(t.ok));
  });

  t.test('should be empty when an empty range is given', t => {
    t.test('before b', t => empty(slice(s, [{prev: 'b'}, {prev: 'b'}])).then(t.ok));
    t.test('after a', t => empty(slice(s, [{next: 'a'}, {next: 'a'}])).then(t.ok));
    t.test('between a and b', t => empty(slice(s, [{next: 'a'}, {prev: 'b'}])).then(t.ok));

    // t.test('between b and a', t => empty(slice(s, [{prev: 'b'}, {next: 'a'}])).then(t.ok));
    // t.test('xx', t => State.toArray(slice(s, [{prev: 'b'}, {next: 'a'}])).then(t.comment));
  });
});

test('splice', t => {
  var { is, splice } = State;
  t.test('should return an equal state when nothing is removed and added', t => {
    return is(splice(state({a: 3, b: 4, c: 5}), [{next: 'a'}, {prev: 'b'}]), state({a: 3, b: 4, c: 5})).then(t.ok);
  });

  t.test('should return an equal state when something is added without removing', t => {
    return is(splice(state({a: 3, b: 4, c: 5}), [{next: 'a'}, {prev: 'b'}], state({d: 6})), state({a: 3, d: 6, b: 4, c: 5})).then(t.ok);
  });

  t.test('should return an equal state when something is added when removing', t => {
    return is(splice(state({a: 3, b: 4, c: 5}), [{next: 'a'}, {prev: 'c'}], state({d: 6})), state({a: 3, d: 6, c: 5})).then(t.ok);
  });

  t.test('should return an equal state when something is added without removing at the beginning 1', t => {
    return is(splice(state({a: 3, b: 4, c: 5}), [{next: null}, {prev: 'a'}], state({d: 6})), state({d: 6, a: 3, b: 4, c: 5})).then(t.ok);
  });

  t.test('should return an equal state when something is added without removing at the beginning 2', t => {
    return is(splice(state({a: 3, b: 4, c: 5}), [{prev: 'a'}, {prev: 'a'}], state({d: 6})), state({d: 6, a: 3, b: 4, c: 5})).then(t.ok);
  });

  t.test('should return an equal state when something is added when removing at the end 1', t => {
    return is(splice(state({a: 3, b: 4, c: 5}), [{next: 'b'}, {prev: null}], state({d: 6})), state({a: 3, b: 4, d: 6})).then(t.ok);
  });

  t.test('should return an equal state when something is added when removing at the end 2', t => {
    return is(splice(state({a: 3, b: 4, c: 5}), [{next: 'b'}, {next: 'c'}], state({d: 6})), state({a: 3, b: 4, d: 6})).then(t.ok);
  });

  t.test('should return an equal state when something is added without removing at the end 1', t => {
    return is(splice(state({a: 3, b: 4, c: 5}), [{next: 'c'}, {prev: null}], state({d: 6})), state({a: 3, b: 4, c: 5,d: 6})).then(t.ok);
  });

  t.test('should return an equal state when something is added without removing at the end 2', t => {
    return is(splice(state({a: 3, b: 4, c: 5}), [{next: 'c'}, {next: 'c'}], state({d: 6})), state({a: 3, b: 4, c: 5, d: 6})).then(t.ok);
  });

});

test('map', t => {
  var { map, is } = State;
  t.test('should map stuff', t => is(map(state({a: 3, b: 4, c: 5}), x => x * 2), state({a: 6, b: 8, c: 10})).then(t.ok));
});

test('filter', t => {
  var { filter, is } = State;
  t.test('should filter stuff', t => is(filter(state({a: 3, b: 4, c: 5}), x => x > 3), state({b: 4, c: 5})).then(t.ok));
  t.test('should filter less stuff', t => is(filter(state({a: 3}), x => x > 3), state({})).then(t.ok));
});

test('scan', t => {
  var { scan, is } = State;
  t.test('should scan stuff', t => is(scan(state({a: 3, b: 4, c: 5}), (x, y) => x + y, 0), state({a: 3, b: 7, c: 12})).then(t.ok));
});

test('zip', t => {
  var { zip, toArray } = State;
  t.test('should zip stuff', t => toArray(zip(state({a: 3, b: 4, c: 5}), state({d: 6, e: 7, f: 8}))).then(a => t.same(a, [[3,6], [4,7], [5,8]])));
});

test('flatten', t => {
  var { flatten, is, entries } = State;
  var tree = state({x: state({a: 3, b: 4, c: 5}), y: state({d: 6, e: 7, f: 8})});
  var flattened = state({'x/a': 3, 'x/b': 4, 'x/c': 5, 'y/d': 6, 'y/e': 7, 'y/f': 8});

  t.test('should flatten stuff', t => is(flatten(tree), flattened).then(t.ok));
});

test('groupBy', t => {
  var { groupBy, flatten, is, toArray } = State;

  var s = state([0,1,2,3,4,5]);
  var grouped = groupBy(s, x => String(x % 2));

  t.test(t => toArray(flatten(grouped)).then(t.comment));
});

test('keyBy', t => {
  var { keyBy } = State,
      array = [3, 4, 5],
      object = {6: 3, 8: 4, 10: 5},
      keyFn = (value, key) => (value * 2).toString();

  t.test('should key the state by the keyFn', t => State.is(state(object), keyBy(state(array), keyFn)).then(t.ok));
});

test('take', t => {
  var { take, is } = State;
  t.test('should take count', t => is(take(state({a: 3, b: 4, c: 5, d: 6}), 2), state({a: 3, b: 4})).then(t.ok));
});

test('skip', t => {
  var { skip, is, toArray } = State;
  t.test('should skip count', t => is(skip(state({a: 3, b: 4, c: 5, d: 6}), 2), state({c: 5, d: 6})).then(t.ok));
});

test('entries', t => {
  var { entries } = State;

  var object = {a: 3, b: 4, c: 5},
      s = state(object),
      u = state({});

  t.test('should return an iterator over the entire state when no range is given', t => {
    t.test('full state',  t => AsyncIterator.is(AsyncIterator.fromObject(object), entries(s), Entry.is).then(t.ok));
    t.test('empty state', t => AsyncIterator.is(AsyncIterator.fromObject({}), entries(u)).then(t.ok));
  });

  t.test('should return an iterator over a range when a range is given', t => {
    t.test('everything', t => AsyncIterator.is(entries(s, [{next: null}, {prev: null}]), AsyncIterator.fromObject({a: 3, b: 4, c: 5}), Entry.is).then(t.ok));
    t.test('nothing',    t => AsyncIterator.is(entries(s, [{next: 'a'},  {prev: 'b'}]), AsyncIterator.fromObject({}), Entry.is).then(t.ok));
    t.test('after a',    t => AsyncIterator.is(entries(s, [{next: 'a'},  {prev: null}]), AsyncIterator.fromObject({b: 4, c: 5}), Entry.is).then(t.ok));
    t.test('until c',    t => AsyncIterator.is(entries(s, [{next: null}, {prev: 'c'}]), AsyncIterator.fromObject({a: 3, b: 4}), Entry.is).then(t.ok));
    t.test('only b',     t => AsyncIterator.is(entries(s, [{prev: 'b'},  {next: 'b'}]), AsyncIterator.fromObject({b: 4}), Entry.is).then(t.ok));
  });
});

test('fromEntries', t => {
  t.test('should produce a state', t => {
    var { is, fromEntries } = State,
        object = {a: 3, b: 4, c: 5};

    var iterator = AsyncIterator.fromObject;

    t.test(t => is(fromEntries(iterator(object)), state(object)).then(t.ok));

    t.test('get', t => {
      t.test('should contain a',     t => fromEntries(iterator(object)).get('a').then(k => t.equals(k, 3)));
      t.test('should contain b',     t => fromEntries(iterator(object)).get('b').then(k => t.equals(k, 4)));
      t.test('should contain c',     t => fromEntries(iterator(object)).get('c').then(k => t.equals(k, 5)));
      t.test('should not contain d', t => fromEntries(iterator(object)).get('d').then(t.fail, t.pass));
    });

    t.test('next', t => {
      t.test('a first',   t => fromEntries(iterator(object)).next().then(k => t.equals(k, 'a')));
      t.test('b after a', t => fromEntries(iterator(object)).next('a').then(k => t.equals(k, 'b')));
      t.test('c after b', t => fromEntries(iterator(object)).next('b').then(k => t.equals(k, 'c')));
      t.test('c last',    t => fromEntries(iterator(object)).next('c').then(k => t.equals(k, null)));
    });

    t.test('prev', t => {
      t.test('c last',     t => fromEntries(iterator(object)).prev().then(k => t.equals(k, 'c')));
      t.test('b before c', t => fromEntries(iterator(object)).prev('c').then(k => t.equals(k, 'b')));
      t.test('a before b', t => fromEntries(iterator(object)).prev('b').then(k => t.equals(k, 'a')));
      t.test('a first',    t => fromEntries(iterator(object)).prev('a').then(k => t.equals(k, null)));
    });
  });
});

test('fromKeys', t => {
  var { is, fromKeys } = State;
  t.test('should create a state with the given keys and null values', t => {
    return is(state({a: null, b: null, c: null}), fromKeys(AsyncIterator.fromArray(['a', 'b', 'c']))).then(t.ok);
  });
});

test('fromValues', t => {
  var { is, fromValues } = State;
  t.test('should create a state with the given values and incrementing keys', t => {
    // FIXME we test nothing here
    return is(fromValues(AsyncIterator.fromArray(['a', 'b', 'c'])), fromValues(AsyncIterator.fromArray(['a', 'b', 'c']))).then(t.ok);
  });
});


test('lazy', t => {
  var { lazy, is } = State;
  t.test('should work', t => is(lazy(() => state([1,2,3])), state([1,2,3])).then(t.ok));
});
