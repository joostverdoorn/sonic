import   test          from 'blue-tape';
import   Entry         from '../dist/entry';
import   State         from '../dist/state';
import   AsyncIterator from '../dist/async_iterator';
import { Observable,
         Subject }     from '../dist/observable';
import   List          from '../dist/list';

function state(object) {
  return Array.isArray(object) ? State.fromArray(object) : State.fromObject(object);
}

// test('create', t => {
//   var { create } = List;
//   t.test("should have an intitial state equal to the given state", t => State.is(create(state({a: 6, b: 8, c: 10 }), Subject.create()).state, state({a: 6, b: 8, c: 10 })).then(t.ok));
//
//   t.test("should update the state when a patch is observed", t => {
//      var subject = Subject.create(),
//         list = create(state({a: 6, b: 8, c: 10 }), subject);
//
//     subject.onNext({range: [{prev: null, prev: null}], added: state({d: 12})})
//      .then( () => State.is(list.state, state({a: 6, b: 8, c: 10, d: 12 })).then(t.ok) );
//   })
// });

test('map', t => {
  var state = State.fromObject({a: 3, b: 4, c: 5});
  var subject = Subject.create();
  var list = List.create(state, subject);
  var mapped = List.map(list, x => x * 2);
  var patch = {range: [{next: 'c'}, {prev: null}], added: State.fromObject({d: 6})};

  t.test('should work reactively', t => {
    return State.is(mapped.state, State.fromObject({a: 6, b: 8, c: 10 }))
      .then(t.ok)
      .then(subject.onNext(patch))
      .then(() => State.is(mapped.state, State.fromObject({a: 6, b: 8, c: 10, d: 12})))
      .then(t.ok);
  });
});


test('scan', t => {
  var state = State.fromArray([1,2,3]);
  var subject = Subject.create();
  var list = List.create(state, subject);
  var scanned = List.scan(list, (x, y) => x + y, 0);
  var patch = {range: [{next: 2}, {prev: null}], added: State.fromObject({a: 4})};

  t.test(t => State.toArray(scanned.state).then(t.comment))

  t.test('should work reactively', t => {
    return State.is(scanned.state, State.fromArray([1,3,6]))
      .then(t.ok)
      .then(subject.onNext(patch))
      .then(() => t.test(t => State.toArray(scanned.state).then(t.comment)))

      // .then(() => State.is(scanned.state, State.fromArray([1,3,6,10])))
      // .then(t.ok);
  });
});
