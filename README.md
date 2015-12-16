Sonic
=====
[![npm version](https://badge.fury.io/js/sonicjs.svg)](https://badge.fury.io/js/sonicjs)
[![Build Status](https://travis-ci.org/joostverdoorn/sonic.svg?branch=develop)](https://travis-ci.org/joostverdoorn/sonic)
[![Coverage Status](https://coveralls.io/repos/joostverdoorn/sonic/badge.svg?branch=develop&service=github)](https://coveralls.io/github/joostverdoorn/sonic?branch=develop)
[![Join the chat at https://gitter.im/joostverdoorn/sonic](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/joostverdoorn/sonic?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Installing
```bash
npm install sonicjs
```

## Examples
Map and print a state, asynchronously.
```javascript
import { State } from 'sonic.ts';
const log = console.log.bind(console);

var state = State.fromArray([1,2,3]);
var mapped = State.map(state, value => {
  // Do something async
  return Promise.resolve(value * 2);
});

State.toArray(mapped).then(log); // [2,4,6]
```

Convert iterables over space and time.
```javascript
import { AsyncIterator, State, Observable } from 'sonic.ts'
const log = console.log.bind(console);

var it = AsyncIterator.fromObject({a: 1, b: 2});
var state = State.fromEntries(it);
var observable = Observable.fromIterator(it);

AsyncIterator.toArray(it).then(log); // [['a', 1], ['b', 2]]
AsyncIterator.toArray(State.entries(state)).then(log); // [['a', 1], ['b', 2]]
AsyncIterator.toArray(Observable.toIterator(observable)).then(log); // [['a', 1], ['b', 2]]
```

Create reactive stores
```javascript
import { AsyncIterator, State, Store, Observable, Patch } from 'sonic.ts'
var log = console.log.bind(console);

var state = State.fromObject({a: 3, b: 4, c: 5});
var subject = Subject.create();

var store = Store.create(state, subject);
var scanned = Store.scan(store, (x, y) => x + y, 0);

State.toObject(scanned.state)
  .then(log) // { a: 3, b: 7, c: 12 }
  .then(() => {
    return store.dispatcher.onNext(Patch.set(6, 'b')).then(() => {
      return State.toObject(scanned.state).then(log); // { a: 3, b: 9, c: 14 }
    });
  });

scanned.dispatcher.subscribe({
  onNext: log // { range: [{prev: "b"}, {next: "b"}], added: State({b: 9}) }
});

```
