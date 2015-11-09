import test          from 'blue-tape';
import AsyncIterator from '../dist/async_iterator';

function iterator(values) {
  var current = -1;
  return {
    next: () => ++current < values.length ? Promise.resolve({ done: false, value: values[current] }) : Promise.resolve({ done: true })
  }
}


test('every', t => {
  t.test('should resolve with true if the predicate is true for every element', t => {
    return AsyncIterator.every(iterator([1,2,3]), x => x > 0).then(t.ok, t.error);
  });

  t.test('should resolve with false if the predicate is not true for every element', t => {
    return AsyncIterator.every(iterator([1,2,3]), x => x > 2).then(t.notOk, t.error);
  });
});

test('some', t => {
  t.test('should resolve with true if the predicate is true for some element', t => {
    return AsyncIterator.some(iterator([1,2,3]), x => x > 2).then(t.ok, t.error);
  });

  t.test('should resolve with false if the predicate is not true for some element', t => {
    return AsyncIterator.some(iterator([1,2,3]), x => x > 6).then(t.notOk, t.error);
  });
});

test('forEach', t => {
  t.test('should hit each element', t => {
    var result = [];
    return AsyncIterator.forEach(iterator([1,2,3]), x => result.push(x)).then(() => {
      t.same([1,2,3], result);
    });
  });
});

test('reduce', t => {
  t.test('should reduce', t => {
    return AsyncIterator.reduce(iterator([1,2,3]), (x, y) => x + y, 0).then(x => t.is(x, 6));
  });
});

test('find', t => {
  t.test('should return the first element that satisfies the predicate', t => {
    return AsyncIterator.find(iterator([1,2,3]), x => x > 2).then(x => t.is(x, 3));
  });

  t.test('should reject when no element satisfies the predicate', t => {
    return AsyncIterator.find(iterator([1,2,3]), x => x > 4).then(t.fail, t.pass);
  });
});

test('indexOf', t => {
  t.test('should return the index of the given element', t => {
    return AsyncIterator.indexOf(iterator([1,2,3]), 3).then(i => t.is(i, 2));
  });

  t.test('should reject when the element isnt present', t => {
    return AsyncIterator.indexOf(iterator([1,2,3]), 4).then(t.fail, t.pass);
  })
});

test('at', t => {
  t.test('should resolve with the element at the given index', t => {
    return AsyncIterator.at(iterator([1,2,3]), 2).then(x => t.is(x, 3));
  });

  t.test('should reject when the index is out of bounds', t => {
    return AsyncIterator.at(iterator([1,2,3]), 3).then(t.fail, t.pass);
  });

});

test('contains', t => {
  t.test('should resolve with true when the iterator contains the given element', t => {
    return AsyncIterator.contains(iterator([1,2,3]), 3).then(t.ok);
  });

  t.test('should resolve with false when the iterator doesnt contain the given element', t => {
    return AsyncIterator.contains(iterator([1,2,3]), 4).then(t.notOk);
  });
});

test('is', t => {
  t.test('should resolve with true when the two iterators contain the same results', t => {
    return AsyncIterator.is(iterator([1,2,3]), iterator([1,2,3])).then(t.ok);
  });

  t.test('should resolve with false when the two iterators don\'t contain the same results', t => {
    return AsyncIterator.is(iterator([1,2,3]), iterator([1,2,4])).then(t.notOk);
  });

  t.test('should resolve with false when the two iterators contain the same results, but lengths differ', t => {
    return AsyncIterator.is(iterator([1,2,3]), iterator([1,2,3,4])).then(t.notOk);
  });

  t.test('should resolve with false when the two iterators contain the same results, but lengths differ', t => {
    return AsyncIterator.is(iterator([1,2,3,4]), iterator([1,2,3])).then(t.notOk);
  });

  t.test('should work with a custom comparator', t => {
    return AsyncIterator.is(iterator([1.1, 2.2, 3.3]), iterator([1,2,3]), (a, b) => Math.floor(a) === Math.floor(b)).then(t.ok);
  });
});

test('map', t => {
  var { is, map } = AsyncIterator;

  t.test('should map the given iterator with the given map function', t => {
    return is(map(iterator([1,2,3]), x => x * 2), iterator([2,4,6])).then(t.ok);
  });
});

test('filter', t => {
  var { is, filter } = AsyncIterator;

  t.test('should filter the given iterator with the given filter function', t => {
    return is(filter(iterator([1,2,3]), x => x % 2 == 1), iterator([1,3])).then(t.ok);
  });
});


test('scan', t => {
  var { is, scan } = AsyncIterator;

  t.test('should scan over the given iterator with the given scan function', t => {
    return is(scan(iterator([1,2,3]), (x, y) => x + y, 0), iterator([1,3,6])).then(t.ok);
  });
});


test('concat', t => {
  t.test('should return an iterator over the combined elements', t => {
    return AsyncIterator.is(iterator([1,2,3,4,5,6]), AsyncIterator.concat(iterator([1,2,3]), iterator([4,5,6]))).then(t.ok)
  });
});

test('fromArray', t => {
  t.test('should return an iterator with the values of the array as results', t => {
    return AsyncIterator.is(iterator([1,2,3]), AsyncIterator.fromArray([1,2,3])).then(t.ok);
  });
});

test('fromObject', t => {
  t.test('should return an iterator with the entries of the object as results', t => {
    AsyncIterator.toArray(AsyncIterator.fromObject({a: 1, b: 2, c: 3})).then(t.comment)
    return AsyncIterator.is(iterator([['a', 1], ['b', 2] ,['c', 3]]), AsyncIterator.fromObject({a: 1, b: 2, c: 3}), (a, b) => a[0] === b[0] && a[1] === b[1]).then(t.ok);
  });
});

test('toArray', t => {
  t.test('should return an array containing all elements', t => {
    return AsyncIterator.toArray(iterator([1,2,3])).then(array => t.same(array, [1,2,3]));
  });
});

test('toObject', t => {
  t.test('should return an object containing all entries', t => {
    return AsyncIterator.toObject(iterator([['a', 1], ['b', 2], ['c', 3]])).then(object => t.same(object, {a: 1, b: 2, c: 3}));
  });
});
