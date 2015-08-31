global.bind = require('../dist/bind');

global.fn = -> this.a
global.context = { a: 42, fn: fn }
global.bound1 = fn.bind(context)
global.bound2 = bind(fn, context)

a = () ->
  context.fn()

b = () ->
  bound1()

c = () ->
  bound2()

module.exports =
  tests: {
    a: { fn: a }
    b: { fn: b }
    c: { fn: c }
  }
