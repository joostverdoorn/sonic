import test              from 'blue-tape';
import State             from '../dist/state';
import { AsyncIterator } from '../dist/async_iterator';
import Entry             from '../dist/entry';

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

test('filter', t => {
  var { filter, is } = State;
  t.test('should filter stuff', t => is(filter(state({a: 3, b: 4, c: 5}), x => x > 3), state({b: 4, c: 5})).then(t.ok));
  t.test('should filter less stuff', t => is(filter(state({a: 3}), x => x > 3), state({})).then(t.ok));
});

test('fromEntries', t => {
  t.test('should produce a state', t => {
    var { fromEntries } = State,
        object = {a: 3, b: 4, c: 5}

    t.test('get', t => {
      t.test('should contain a', t => state(object).get('a').then(c(t.equals, 3)));
      t.test('should contain b', t => state(object).get('b').then(c(t.equals, 4)));
      t.test('should contain c', t => state(object).get('c').then(c(t.equals, 5)));
      t.test('should not contain d', t => state(object).get('d').then(t.fail, t.pass));
    });

    t.test('next', t => {
      t.test('a first', t => state(object).next().then(c(t.equals, 'a')));
      t.test('b next of a', t => state(object).next('a').then(c(t.equals, 'b')));
      t.test('c next of b', t => state(object).next('a').then(c(t.equals, 'b')));
      t.test('c last', t => state(object).next('c').then(r(t.equals, null)));
    });

    t.test('prev', t => {
      t.test('c last', t => state(object).prev().then(c(t.equals, 'c')));
      t.test('b before c', t => state(object).prev('c').then(c(t.equals, 'b')));
      t.test('a before b', t => state(object).prev('b').then(c(t.equals, 'a')));
      t.test('a first', t => state(object).prev('a').then(r(t.equals, null)));
    });
  });
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

test('keyBy', t => {
  var { keyBy } = State,
      array = [3, 4, 5],
      object = {6: 3, 8: 4, 10: 5},
      keyFn = (value, key) => value * 2;

  t.test('should key the state by the keyFn', t => State.is(state(object), keyBy(state(array), keyFn)))
});
