import test              from 'blue-tape';
import State         from '../dist/state';
import { AsyncIterator } from '../dist/async_iterator';

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

function state(obj) {
  return Array.isArray(obj) ? State.fromArray(obj) : State.fromObject(obj);
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
  t.test('should return an equal state when nothing is removed and added', t => is(splice(state({a: 3, b: 4, c: 5}), [{next: 'a'}, {prev: 'b'}]), state({a: 3, b: 4, c: 5})));
});

test('filter', t => {
  var { filter, is } = State;
  t.test('should filter stuff', t => is(filter(state({a: 3, b: 4, c: 5}), x => x > 3), state({b: 4, c: 5})));
  t.test('should filter less stuff', t => is(filter(state({a: 3}), x => x > 3), state({})));
});


    // t.end()

    // AsyncIterator.toArray(State.toIterator(a)).then(console.log);
    // AsyncIterator.toArray(State.toIterator(State.splice(a, [{before: 'b', before: 'b'}]))).then(console.log);


    // Promise.all([
    //   // State.is(state, state).then(t.ok, t.fail)
    //   State.is(a, State.splice(a, [{before: 'b'}, {before: 'b'}])).then(t.ok, t.fail)
    //   // State.splice(state, [{before:}, {}]).then(spliced => State.is(state, spliced).then(t.ok, t.fail),
    //   // State.splice(state, [{before:}, {}]).then(spliced => State.is(state, spliced).then(t.ok, t.fail),
    // ]).then(() => t.end());
  // });

test('fromIterator', t => {
  t.test('should not be sensitive to race conditions', t => {
    var obj = {a: 3};
    var it = AsyncIterator.fromObject(obj);
    var s = State.fromIterator(it);


    var u = State.extend(s, {
      next: (key) => s.next(key).then(x => x)
    });

    return u.next().then(console.log)
    // s.next().then(s.get).then(console.log)




  });
});

test('toIterator', t => {
  function toObject(s, range) {
    return AsyncIterator.toObject(State.toIterator(s, range));
  }

  var s = state({a: 3, b: 4, c: 5}),
      u = state({});

  t.test('should return an iterator over the entire state when no range is given', t => {
    t.test('full state',  t => toObject(s).then(c(t.same, {a: 3, b: 4, c: 5})));
    t.test('empty state', t => toObject(u).then(c(t.same, {})));
  });

  t.test('should return an iterator over a range when a range is given', t => {
    t.test('everything', t => toObject(s, [{next: null}, {prev: null}]).then(r(t.same, {a: 3, b: 4, c: 5})));
    t.test('nothing',    t => toObject(s, [{next: 'a'},  {prev: 'b'}]).then(r(t.same, {})));
    t.test('after a',    t => toObject(s, [{next: 'a'},  {prev: null}]).then(r(t.same, {b: 4, c: 5})));
    t.test('until c',    t => toObject(s, [{next: null}, {prev: 'c'}]).then(r(t.same, {a: 3, b: 4})));
    t.test('only b',     t => toObject(s, [{prev: 'b'},  {next: 'b'}]).then(r(t.same, {b: 4})));
  });
});
