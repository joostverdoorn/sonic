import   test          from 'blue-tape';
import   Entry         from '../dist/entry';
import   State         from '../dist/state';
import   AsyncIterator from '../dist/async_iterator';
import { Observable,
         Subject }     from '../dist/observable';
import   Store         from '../dist/store';

function state(object) {
  return Array.isArray(object) ? State.fromArray(object) : State.fromObject(object);
}

function store(object) {
  return Store.create(state(object), Subject.create());
}

// test('create', t => {
//   var { create } = Store;
//   t.test("should have an intitial state equal to the given state", t => State.is(create(state({a: 6, b: 8, c: 10 }), Subject.create()).state, state({a: 6, b: 8, c: 10 })).then(t.ok));
//
//   t.test("should update the state when a patch is observed", t => {
//      var subject = Subject.create(),
//         store = create(state({a: 6, b: 8, c: 10 }), subject);
//
//     subject.onNext({range: [{prev: null, prev: null}], added: state({d: 12})})
//      .then( () => State.is(store.state, state({a: 6, b: 8, c: 10, d: 12 })).then(t.ok) );
//   })
// });

test('map', t => {
  var state = State.fromObject({a: 3, b: 4, c: 5});
  var subject = Subject.create();
  var store = Store.create(state, subject);
  var mapped = Store.map(store, x => x * 2);
  var patch = {range: [{next: 'c'}, {prev: null}], added: State.fromObject({d: 6})};

  t.test('should work reactively', t => {
    return State.is(mapped.state, State.fromObject({a: 6, b: 8, c: 10 }))
      .then(t.ok)
      .then(() => subject.onNext(patch))
      .then(() => State.is(mapped.state, State.fromObject({a: 6, b: 8, c: 10, d: 12})))
      .then(t.ok);
  });
});

test('filter', t => {
  t.test('should work reactively', t => {
    t.test('remove all', async (t) => {
      var s = store({a: 3, b: 4, c: 5});
      var u = Store.filter(s, x => x % 2 === 0);
      var p = {range: [{next: null}, {prev: null}]};

      await s.dispatcher.onNext(p);
      return State.is(u.state, state({})).then(t.ok);
    });

    t.test('remove all but first', async (t) => {
      var s = store({a: 3, b: 4, c: 5});
      var u = Store.filter(s, x => x % 2 === 0);
      var p = {range: [{next: 'b'}, {prev: null}]};

      await s.dispatcher.onNext(p);
      return State.is(u.state, state({b: 4})).then(t.ok);
    });

    t.test('remove all but last', async (t) => {
      var s = store({a: 3, b: 4, c: 5});
      var u = Store.filter(s, x => x % 2 === 0);
      var p = {range: [{next: null}, {prev: 'b'}]};

      await s.dispatcher.onNext(p);
      return State.is(u.state, state({b: 4})).then(t.ok);
    });

    t.test('remove none', async (t) => {
      var s = store({a: 3, b: 4, c: 5});
      var u = Store.filter(s, x => x % 2 === 0);
      var p = {range: [{next: 'a'}, {next: 'a'}]};

      await s.dispatcher.onNext(p);
      return State.is(u.state, state({b: 4 })).then(t.ok);
    });

    t.test('remove none, add something', async (t) => {
      var s = store({a: 3, b: 4, c: 5});
      var u = Store.filter(s, x => x % 2 === 0);
      var p = {range: [{next: 'a'}, {next: 'a'}], added: state({d: 6})};

      await s.dispatcher.onNext(p);
      return State.is(u.state, state({d: 6, b: 4 })).then(t.ok);
    });

    t.test('remove none, add something at beginning', async (t) => {
      var s = store({a: 3, b: 4, c: 5});
      var u = Store.filter(s, x => x % 2 === 0);
      var p = {range: [{next: null}, {prev: 'a'}], added: state({d: 6})};

      await s.dispatcher.onNext(p);
      return State.is(u.state, state({d: 6, b: 4 })).then(t.ok);
    });

    t.test('remove none, add something at end', async (t) => {
      var s = store({a: 3, b: 4, c: 5});
      var u = Store.filter(s, x => x % 2 === 0);
      var p = {range: [{prev: null}, {prev: null}], added: state({d: 6})};

      await s.dispatcher.onNext(p);
      return State.is(u.state, state({b: 4, d: 6 })).then(t.ok);
    });

    t.test('remove all, add something', async (t) => {
      var s = store({a: 3, b: 4, c: 5});
      var u = Store.filter(s, x => x % 2 === 0);
      var p = {range: [{next: null}, {prev: null}], added: state({d: 6})};

      await s.dispatcher.onNext(p);
      return State.is(u.state, state({d: 6})).then(t.ok);
    });

    t.test('remove first, add something', async (t) => {
      var s = store({a: 3, b: 4, c: 5});
      var u = Store.filter(s, x => x % 2 === 0);
      var p = {range: [{next: null}, {next: 'a'}], added: State.fromObject({d: 6})};

      await s.dispatcher.onNext(p);
      return State.is(u.state, state({d: 6, b: 4})).then(t.ok);
    });
  });
});

test('keyBy', t => {
  t.test('adding one, removing one in the middle', t => {
    var state = State.fromObject({a: 1, b: 2, c: 3});
    var subject = Subject.create();
    var store = Store.create(state, subject);
    var keyed = Store.keyBy(store, (value, key) => key.toUpperCase());
    var patch = {range: [{next: 'a'}, {prev: 'c'}], added: State.fromObject({d: 4})};
    return State.is(keyed.state, State.fromObject({A: 1, B: 2, C: 3}))
      .then(t.ok)
      .then(() => subject.onNext(patch))
      .then(() => State.is(keyed.state, State.fromObject({A: 1, D: 4, C: 3})))
      .then(t.ok);
  });

  t.test('adding none, removing one at the beginning', t => {
    var state = State.fromObject({a: 1, b: 2, c: 3});
    var subject = Subject.create();
    var store = Store.create(state, subject);
    var keyed = Store.keyBy(store, (value, key) => key.toUpperCase());
    var patch = {range: [{next: null}, {prev: 'b'}]};
    return State.is(keyed.state, State.fromObject({A: 1, B: 2, C: 3}))
      .then(t.ok)
      .then(() => subject.onNext(patch))
      .then(() => State.is(keyed.state, State.fromObject({B: 2, C: 3})))
      .then(t.ok);
  });

  t.test('adding one, removing none in the end', t => {
    var state = State.fromObject({a: 1, b: 2, c: 3});
    var subject = Subject.create();
    var store = Store.create(state, subject);
    var keyed = Store.keyBy(store, (value, key) => key.toUpperCase());
    var patch = {range: [{next: 'c'}, {prev: null}], added: State.fromObject({d: 4})};
    return State.is(keyed.state, State.fromObject({A: 1, B: 2, C: 3}))
      .then(t.ok)
      .then(() => subject.onNext(patch))
      .then(() => State.is(keyed.state, State.fromObject({A: 1, B: 2, C: 3, D: 4})))
      .then(t.ok);
  });

  t.test('adding one, removing all', t => {
    var state = State.fromObject({a: 1, b: 2, c: 3});
    var subject = Subject.create();
    var store = Store.create(state, subject);
    var keyed = Store.keyBy(store, (value, key) => key.toUpperCase());
    var patch = {range: [{next: null}, {prev: null}], added: State.fromObject({d: 4})};
    return State.is(keyed.state, State.fromObject({A: 1, B: 2, C: 3}))
      .then(t.ok)
      .then(() => subject.onNext(patch))
      .then(() => State.is(keyed.state, State.fromObject({D: 4})))
      .then(t.ok);
  });
});

test('scan', t => {
  t.test('add at the end', t => {
    var state = State.fromObject({a: 1, b: 2, c: 3});
    var subject = Subject.create();
    var store = Store.create(state, subject);
    var scanned = Store.scan(store, (x, y) => x + y, 0);
    var patch = {range: [{next: 'c'}, {prev: null}], added: State.fromObject({d: 4})};
    return State.is(scanned.state, State.fromObject({a: 1, b: 3, c: 6}))
      .then(t.ok)
      .then(() => subject.onNext(patch))
      .then(() => State.is(scanned.state, State.fromObject({a: 1, b: 3, c: 6, d: 10})))
      .then(t.ok);
  });

  t.test('add at the beginning', t => {
    var state = State.fromObject({a: 1, b: 2, c: 3});
    var subject = Subject.create();
    var store = Store.create(state, subject);
    var scanned = Store.scan(store, (x, y) => x + y, 0);
    var patch = {range: [{next: null}, {prev: 'a'}], added: State.fromObject({d: 4})};
    return State.is(scanned.state, State.fromObject({a: 1, b: 3, c: 6}))
      .then(t.ok)
      .then(() => subject.onNext(patch))
      .then(() => State.is(scanned.state, State.fromObject({d: 4, a: 5, b: 7, c: 10})))
      .then(t.ok);
  });

  t.test('add in the middle', t => {
    var state = State.fromObject({a: 1, b: 2, c: 3});
    var subject = Subject.create();
    var store = Store.create(state, subject);
    var scanned = Store.scan(store, (x, y) => x + y, 0);
    var patch = {range: [{next: 'a'}, {prev: 'b'}], added: State.fromObject({d: 4})};
    return State.is(scanned.state, State.fromObject({a: 1, b: 3, c: 6}))
      .then(t.ok)
      .then(() => subject.onNext(patch))
      .then(() => State.is(scanned.state, State.fromObject({a: 1, d: 5, b: 7, c: 10})))
      .then(t.ok);
  });

  t.test('add at the end, remove last', t => {
    var state = State.fromObject({a: 1, b: 2, c: 3});
    var subject = Subject.create();
    var store = Store.create(state, subject);
    var scanned = Store.scan(store, (x, y) => x + y, 0);
    var patch = {range: [{prev: 'c'}, {prev: null}], added: State.fromObject({d: 4})};
    return State.is(scanned.state, State.fromObject({a: 1, b: 3, c: 6}))
      .then(t.ok)
      .then(() => subject.onNext(patch))
      .then(() => State.is(scanned.state, State.fromObject({a: 1, b: 3, d: 7})))
      .then(t.ok);
  });

  t.test('add at the end, remove all but first', t => {
    var state = State.fromObject({a: 1, b: 2, c: 3});
    var subject = Subject.create();
    var store = Store.create(state, subject);
    var scanned = Store.scan(store, (x, y) => x + y, 0);
    var patch = {range: [{prev: 'b'}, {prev: null}], added: State.fromObject({d: 4, e: 5})};
    return State.is(scanned.state, State.fromObject({a: 1, b: 3, c: 6}))
      .then(t.ok)
      .then(() => subject.onNext(patch))
      .then(() => State.is(scanned.state, State.fromObject({a: 1, d: 5, e: 10})))
      .then(t.ok);
  });

  t.test('add at the beginning, remove first', t => {
    var state = State.fromObject({a: 1, b: 2, c: 3});
    var subject = Subject.create();
    var store = Store.create(state, subject);
    var scanned = Store.scan(store, (x, y) => x + y, 0);
    var patch = {range: [{next: null}, {next: 'a'}], added: State.fromObject({d: 4})};
    return State.is(scanned.state, State.fromObject({a: 1, b: 3, c: 6}))
      .then(t.ok)
      .then(() => subject.onNext(patch))
      .then(() => State.is(scanned.state, State.fromObject({d: 4, b: 6, c: 9})))
      .then(t.ok);
  });

  t.test('add in the middle, remove middle', t => {
    var state = State.fromObject({a: 1, b: 2, c: 3});
    var subject = Subject.create();
    var store = Store.create(state, subject);
    var scanned = Store.scan(store, (x, y) => x + y, 0);
    var patch = {range: [{next: 'a'}, {prev: 'c'}], added: State.fromObject({d: 4})};
    return State.is(scanned.state, State.fromObject({a: 1, b: 3, c: 6}))
      .then(t.ok)
      .then(() => subject.onNext(patch))
      .then(() => State.is(scanned.state, State.fromObject({a: 1, d: 5, c: 8})))
      .then(t.ok);
  });
});

test('take', t => {
  t.test('add one, remove one in the middle', t => {
    var state = State.fromObject({a: 1, b: 2, c: 3, d: 4});
    var subject = Subject.create();
    var store = Store.create(state, subject);
    var taken = Store.take(store, 3);
    var patch = {range: [{next: 'a'}, {prev: 'c'}], added: State.fromObject({e: 5})};

    return State.is(taken.state, State.fromObject({a: 1, b: 2, c: 3}))
      .then(t.ok)
      .then(() => subject.onNext(patch))
      .then(() => State.is(taken.state, State.fromObject({a: 1, e: 5, c: 3})))
      .then(t.ok);
  });

  t.test('add one, remove two at the beginning', t => {
    var state = State.fromObject({a: 1, b: 2, c: 3, d: 4});
    var subject = Subject.create();
    var store = Store.create(state, subject);
    var taken = Store.take(store, 3);
    var patch = {range: [{next: null}, {prev: 'c'}], added: State.fromObject({e: 5})};

    return State.is(taken.state, State.fromObject({a: 1, b: 2, c: 3}))
      .then(t.ok)
      .then(() => subject.onNext(patch))
      .then(() => State.is(taken.state, State.fromObject({e: 5, c: 3, d: 4})))
      .then(t.ok);
  });

  t.test('add two, remove one at the end', t => {
    var state = State.fromObject({a: 1, b: 2, c: 3, d: 4});
    var subject = Subject.create();
    var store = Store.create(state, subject);
    var taken = Store.take(store, 3);
    var patch = {range: [{next: 'c'}, {prev: null}], added: State.fromObject({e: 5})};

    return State.is(taken.state, State.fromObject({a: 1, b: 2, c: 3}))
      .then(t.ok)
      .then(() => subject.onNext(patch))
      .then(() => State.is(taken.state, State.fromObject({a: 1, b: 2, c: 3})))
      .then(t.ok);
  });

  t.test('add none, remove one at the beginning', t => {
    var state = State.fromObject({a: 1, b: 2, c: 3, d: 4});
    var subject = Subject.create();
    var store = Store.create(state, subject);
    var taken = Store.take(store, 3);
    var patch = {range: [{prev: 'a'}, {prev: 'b'}]};

    return State.is(taken.state, State.fromObject({a: 1, b: 2, c: 3}))
      .then(t.ok)
      .then(() => subject.onNext(patch))
      .then(() => State.is(taken.state, State.fromObject({b: 2, c: 3, d: 4})))
      .then(t.ok);
  });

  t.test('add none, remove two at the end', t => {
    var state = State.fromObject({a: 1, b: 2, c: 3, d: 4});
    var subject = Subject.create();
    var store = Store.create(state, subject);
    var taken = Store.take(store, 3);
    var patch = {range: [{next: 'b'}, {prev: null}]};

    return State.is(taken.state, State.fromObject({a: 1, b: 2, c: 3}))
      .then(t.ok)
      .then(() => subject.onNext(patch))
      .then(() => State.is(taken.state, State.fromObject({a: 1, b: 2})))
      .then(t.ok);
  });

  t.test('add two, remove none at the beginning', t => {
    var state = State.fromObject({a: 1, b: 2, c: 3, d: 4});
    var subject = Subject.create();
    var store = Store.create(state, subject);
    var taken = Store.take(store, 3);
    var patch = {range: [{next: null}, {next: null}], added: State.fromObject({e: 5, f: 6})};

    return State.is(taken.state, State.fromObject({a: 1, b: 2, c: 3}))
      .then(t.ok)
      .then(() => subject.onNext(patch))
      .then(() => State.is(taken.state, State.fromObject({e: 5, f: 6, a: 1})))
      .then(t.ok);
  });
});
