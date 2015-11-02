import test from 'tape';
import State from '../dist/state';
import AsyncIterator from '../dist/async_iterator';


function state(obj) {
  return Array.isArray(obj) ? State.fromArray(obj) : State.fromObject(obj);
}

test('first', t => {
  t.test('it should resolve with the first element of the state', t => {
    State.first(state([1,2,3])).then(first => t.equal(first, 1), t.fail).then(t.end);
  });

  t.test('it should reject when the state is empty', t => {
    State.first(state([])).then(t.fail, t.pass).then(t.end);
  });
});

test('last', t => {
  t.test('it should resolve with the last element of the state', t => {
    State.last(state([1,2,3])).then(last => t.equal(last, 3), t.fail).then(t.end);
  });

  t.test('it should reject when the state is empty', t => {
    State.last(state([])).then(t.fail, t.pass).then(t.end);
  });
});

test('has', t => {
  t.test('it should resolve with true when the state contains the key', t => {
    State.has(state({a: 3, b: 4, c: 5}), 'c').then(t.ok, t.fail).then(t.end);
  });

  t.test('it should resolve with false if the state doesnt contain the key', t => {
    State.has(state({a: 3, b: 4, c: 5}), 'd').then(t.notOk, t.fail).then(t.end);
  });
});

test('is', t => {
  t.test('it should resolve with true if two states have the same keys and values', t => {
    var a = state({a: 3, b: 4, c: 5}),
        b = state({a: 3, b: 4, c: 5});

    Promise.all([
      State.is(a, b).then(t.ok, t.fail),
      State.is(b, a).then(t.ok, t.fail)
    ]).then(() => t.end());
  });

  t.test('it should resolve with false of two states have the same keys but not the same values', t => {
    var a = state({a: 3, b: 4, c: 5}),
        b = state({a: 2, b: 4, c: 5});

    Promise.all([
      State.is(a, b).then(t.notOk, t.fail),
      State.is(b, a).then(t.notOk, t.fail)
    ]).then(() => t.end());
  });

  t.test('it should resolve with false when two states differ in length', t => {
    var a = state({a: 3, b: 4, c: 5}),
        b = state({a: 3, b: 4, c: 5, d: 6});

    Promise.all([
      State.is(a, b).then(t.notOk, t.fail),
      State.is(b, a).then(t.notOk, t.fail)
    ]).then(() => t.end());
  });
});

// test('splice', t => {
//   t.test('it should not change when nothing is removed and added', t => {
//     var state = state({a: 3, b: 4, c: 5});
//
//     t.end()
//
//     Promise.all([
//       State.is(state, State.splice(state, [{before:'a'}, {before: 'a'}])).then(t.ok, t.fail)
//       // State.splice(state, [{before:}, {}]).then(spliced => State.is(state, spliced).then(t.ok, t.fail),
//       // State.splice(state, [{before:}, {}]).then(spliced => State.is(state, spliced).then(t.ok, t.fail),
//       // State.splice(state, [{before:}, {}]).then(spliced => State.is(state, spliced).then(t.ok, t.fail),
//     ]).then(() => t.end());
//   });
// });
