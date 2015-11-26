import   test          from 'blue-tape';
import { Observable,
         Subject }     from '../dist/observable';
import   AsyncIterator from '../dist/async_iterator';

function timeout(promise, time) {
  return new Promise((resolve, reject) => {
    setTimeout(reject, time);
    promise.then(resolve, reject);
  });
}

test('Observable', t => {
  t.test('create', t => {
    var observable = Observable.create(subject => {
      subject.onNext(3);
    });

    return timeout(new Promise((resolve, reject) => {
      observable.subscribe({onNext: resolve});
    }), 100).then(value => {debugger; t.is(value, 3)});
  });


  t.test('map', t => {
    var { map, create } = Observable;

    var observable = create(subject => {
      subject.onNext(3);
    });

    var mapped = map(observable, x => x*2)

    return timeout(new Promise((resolve, reject) => {
      mapped.subscribe({onNext: resolve});
    }), 100).then(value => {debugger; t.is(value, 6)});
  })
});
