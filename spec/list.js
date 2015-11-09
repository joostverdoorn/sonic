import   test          from 'blue-tape';
import   Entry         from '../dist/entry';
import   State         from '../dist/state';
import   AsyncIterator from '../dist/async_iterator';
import { Observable,
         Subject }     from '../dist/observable';
import   List          from '../dist/list';

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
