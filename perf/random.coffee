global.Promise = require("bluebird")
global.Sonic = require('../dist/sonic.browser')
global.x = [];

global.arr = [1...1000]
global.list = Sonic arr
global.mapFn = (x) -> Math.sqrt(x)
global.scanFn = (x, y) -> x + y


a = (deferred)->
    mapped = list.scan(scanFn)
    mapped.toArray().then(mapped.toArray).then(() -> deferred.resolve())

b = (deferred)->
    cache = list.scan(scanFn).cache()
    cache.toArray().then(cache.toArray).then(() -> deferred.resolve())

c = (deferred)->
    arr.map(mapFn)
    deferred.resolve()

d = (deferred)->
    arr.map(mapFn)

module.exports =
  tests: {
    a: { fn: a, defer: true }
    b: { fn: b, defer: true }
    c: { fn: c, defer: true }
    d: { fn: d, defer: false }
  }
