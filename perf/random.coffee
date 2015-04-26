Sonic   = require('../../dist/sonic')
global.xs = [0...1000]
global.ys = new Sonic.ArrayList(xs)
global.zs = new Sonic.LinkedList(xs)

a = do ( ys ) ->
  -> ys.toArray()

b = do ( zs ) ->
  -> zs.toArray()

c = do ( ) ->
  -> xs.reduce(((res, x) -> res.push(x)), [])


module.exports =
  tests: { a, b, c }

