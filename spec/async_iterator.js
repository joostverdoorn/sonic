import test          from 'tape';
import Key           from '../dist/key';
import AsyncIterator from '../dist/async_iterator';

// console.log('test')
function createIterator() {
  var current = Key.sentinel;
  return {
    get:  () => current !== Key.sentinel ? Promise.resolve(4) : Key.NOT_FOUND,
    next: () => current === Key.sentinel ? Promise.resolve(current = 1) : Promise.resolve(current = Key.sentinel)
  }
}

test('extend', t => {
  t.test('should extend the iterator with the partial', t => {
    var iterator = createIterator(),
        get = () => {},
        next = () => {};

    var it = AsyncIterator.extend(iterator, {get, next});

    t.equals(it.get, get);
    t.equals(it.next, next);

    t.end();
  });
});


test('some', t => {

  t.test('should resolve with true if the predicate is true for some element', t => {
    var iterator = createIterator();
    AsyncIterator.some(iterator, x => x > 2).then(t.ok, t.error).then(t.end);
  });

  t.test('should resolve with false if the predicate is not true for some element', t => {
    var iterator = createIterator();
    AsyncIterator.some(iterator, x => x < 2).then(t.notOk, t.error).then(t.end);
  });

  //
  // t.end()
});

test('every', t => {
  t.test('should resolve with true if the predicate is true for every element', t => {
    var iterator = createIterator();
    AsyncIterator.every(iterator, x => x > 2).then(t.ok, t.error).then(t.end);
  });

  t.test('should resolve with false if the predicate is not true for every element', t => {
    var iterator = createIterator();
    AsyncIterator.every(iterator, x => x < 2).then(t.notOk, t.error).then(t.end);
  });

  // t.end()
});





// test.end();
//
// test('Bla', function (t) {
//   t.equal(true, false);
//   t.end();
//
//   describe "some", ->
//     it "should resolve with true if the predicate is true for some element", (done) ->
//       expect(AsyncIterator.some(@iterator, (x) -> x > 2)).toResolveWith(true, done)
//
//   describe "every", ->
//     it "should resolve with true if the predicate is true for every element", (done) ->
//       expect(AsyncIterator.every(@iterator, (x) -> x > 2)).toResolveWith(true, done)
//
// })
