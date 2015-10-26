require('helpers/promise_matchers')
Key           = require('src/key')
AsyncIterator = require('src/async_iterator').default

beforeEach ->
  current = null
  @iterator =
    get: () -> `current ? Key.NOT_FOUND : Promise.resolve(4)`
    next: () -> `current ? Promise.resolve(null) : Promise.resolve(1)`

describe "some", ->
  it "should resolve with true if the predicate is true for some element", (done) ->
    expect(AsyncIterator.some(@iterator, (x) -> x > 2)).toResolveWith(true, done)
