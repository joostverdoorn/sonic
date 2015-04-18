Sonic   = require('../../dist/sonic')
x = [0...1000]

a = do ( Sonic ) ->
  -> (new Sonic.ArrayList(x)).toArray()

b = do ( Sonic ) ->
  ->
    res = []
    res.push(y) for y in x
    res

module.exports =
  tests: { a, b }

