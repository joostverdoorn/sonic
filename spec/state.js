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

// Curry
function c(fn) {
  var args = slice(arguments, 1);
  return function() {
    return fn.apply(null, concat(args, slice(arguments)));
  }
}

// Reverse curry
function r(fn) {
  var args = slice(arguments, 1);
  return function() {
    return fn.apply(null, concat(slice(arguments), args));
  }
}

function state(object) {
  return State.fromEntries(AsyncIterator.fromObject(object));
}

test('first', t => {
  var { first } = State;

  t.test('should resolve with the first element of the state', t => first(state([1,2,3])).then(c(t.equal, 1)));
  t.test('should reject when the state is empty', t => first(state([])).then(t.fail, t.pass));
});

test('last', t => {
  var { last } = State;

  t.test('should resolve with the last element of the state', t => last(state([1,2,3])).then(c(t.equal, 3)));
  t.test('should reject when the state is empty', t => last(state([])).then(t.fail, t.pass));
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

test('isEmpty', t => {
  var { isEmpty } = State;

  t.test('should resolve with true if the state has no entries', t => isEmpty(state({})).then(t.ok));
  t.test('should resolve with false if the state has entries', t => isEmpty(state({a: 3, b: 4, c: 5})).then(t.notOk));
});

test('slice', t => {
  var { is, isEmpty, slice } = State;
  var s = state({a: 3, b: 4, c: 5});

  t.test('should return the sliced array', t => {
    t.test('everything', t => is(slice(state({a: 3, b: 4, c: 5}), [{next: null}, {prev: null}]), state({a: 3, b: 4, c: 5})).then(t.ok));
    t.test('nothing',    t => is(slice(state({a: 3, b: 4, c: 5}), [{next: 'a'},  {prev: 'b'}]), state({})).then(t.ok));
    t.test('after a',    t => is(slice(state({a: 3, b: 4, c: 5}), [{next: 'a'},  {prev: null}]), state({b: 4, c: 5})).then(t.ok));
    t.test('until c',    t => is(slice(state({a: 3, b: 4, c: 5}), [{next: null}, {prev: 'c'}]), state({a: 3, b: 4})).then(t.ok));
    t.test('only b',     t => is(slice(state({a: 3, b: 4, c: 5}), [{prev: 'b'},  {next: 'b'}]), state({b: 4})).then(t.ok));
  });

  t.test('should be empty when an empty range is given', t => {
    t.test('before b', t => isEmpty(slice(s, [{prev: 'b'}, {prev: 'b'}])).then(t.ok));
    t.test('after a', t => isEmpty(slice(s, [{next: 'a'}, {next: 'a'}])).then(t.ok));
    t.test('betweeen a and b', t => isEmpty(slice(s, [{next: 'a'}, {prev: 'b'}])).then(t.ok));
  });
});

test('splice', t => {
  var { is, splice } = State;
  t.test('should return an equal state when nothing is removed and added', t => {
    return is(splice(state({a: 3, b: 4, c: 5}), [{next: 'a'}, {prev: 'b'}]), state({a: 3, b: 4, c: 5}));
  });

  t.test('should return an equal state when something is added without removing', t => {
    return is(splice(state({a: 3, b: 4, c: 5}), [{next: 'a'}, {prev: 'b'}], state({d: 6})), state({a: 3, d: 6, b: 4, c: 5}));
  });

  t.test('should return an equal state when something is added when removing', t => {
    return is(splice(state({a: 3, b: 4, c: 5}), [{next: 'a'}, {prev: 'c'}], state({d: 6})), state({a: 3, d: 6, c: 5}));
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

test('flatten', t => {
  var { flatten, is, entries } = State;
  var tree = state({x: state({a: 3, b: 4, c: 5}), y: state({d: 6, e: 7, f: 8})});
  var flattened = state({'x/a': 3, 'x/b': 4, 'x/c': 5, 'y/d': 6, 'y/e': 7, 'y/f': 8});

  t.test('should flatten stuff', t => is(flatten(tree), flattened).then(t.ok));
});

test('keyBy', t => {
  var { keyBy } = State,
      array = [3, 4, 5],
      object = {6: 3, 8: 4, 10: 5},
      keyFn = (value, key) => (value * 2).toString();

  t.test('should key the state by the keyFn', t => State.is(state(object), keyBy(state(array), keyFn)).then(t.ok));
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
      t.test('should contain a', t => fromEntries(iterator(object)).get('a').then(c(t.equals, 3)));
      t.test('should contain b', t => fromEntries(iterator(object)).get('b').then(c(t.equals, 4)));
      t.test('should contain c', t => fromEntries(iterator(object)).get('c').then(c(t.equals, 5)));
      t.test('should not contain d', t => fromEntries(iterator(object)).get('d').then(t.fail, t.pass));
    });

    t.test('next', t => {
      t.test('a first', t => fromEntries(iterator(object)).next().then(c(t.equals, 'a')));
      t.test('b next of a', t => fromEntries(iterator(object)).next('a').then(c(t.equals, 'b')));
      t.test('c next of b', t => fromEntries(iterator(object)).next('a').then(c(t.equals, 'b')));
      t.test('c last', t => fromEntries(iterator(object)).next('c').then(r(t.equals, null)));
    });

    t.test('prev', t => {
      t.test('c last', t => fromEntries(iterator(object)).prev().then(c(t.equals, 'c')));
      t.test('b before c', t => fromEntries(iterator(object)).prev('c').then(c(t.equals, 'b')));
      t.test('a before b', t => fromEntries(iterator(object)).prev('b').then(c(t.equals, 'a')));
      t.test('a first', t => fromEntries(iterator(object)).prev('a').then(r(t.equals, null)));
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
    // FIXME
    return is(fromValues(AsyncIterator.fromArray(['a', 'b', 'c'])), fromValues(AsyncIterator.fromArray(['a', 'b', 'c']))).then(t.ok);
  });
});
