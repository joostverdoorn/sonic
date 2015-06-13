global.Sonic = require('../dist/sonic')
global.x = [];

a = do ( ) ->
  -> x instanceof Array

b = do ( ) ->
  -> typeof x == 'array'

module.exports =
  tests: { a, b }
