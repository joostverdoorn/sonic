global.Promise = require("bluebird")
global.Sonic = require('../dist/sonic.browser')
global.x = [];

global.arr = [1...100]
global.list = Sonic arr
global.mapFn = (x) -> x*2


a = (deferred)->
    list.map(mapFn).toArray().then(() -> deferred.resolve())

b = (deferred)->
    arr.map(mapFn)
    deferred.resolve()

c = (deferred)->
    arr.map(mapFn)

module.exports =
  tests: {
    a: { fn: a, defer: true }
    b: { fn: b, defer: true }
    c: { fn: c, defer: false }
  }
