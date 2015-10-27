require('helpers/promise_matchers')
Key           = require('src/key')
AsyncIterator = require('src/async_iterator').default

beforeEach ->
  current = Key.sentinel
  @iterator =
    get: () -> `current !== Key.sentinel ? Promise.resolve(4) : Key.NOT_FOUND`
    next: () -> `current === Key.sentinel ? Promise.resolve(current = 1) : Promise.resolve(current = Key.sentinel)`

describe "some", ->
  it "should resolve with true if the predicate is true for some element", (done) ->
    expect(AsyncIterator.some(@iterator, (x) -> x > 2)).toResolveWith(true, done)

describe "every", ->
  it "should resolve with true if the predicate is true for every element", (done) ->
    expect(AsyncIterator.every(@iterator, (x) -> x > 2)).toResolveWith(true, done)
