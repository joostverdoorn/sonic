Sonic   = require('../../dist/sonic')

list = Sonic(3)

a = do ( list ) ->
  -> list.get(list.prev())

b = do ( list ) ->
  -> list.last()

c = do ( list ) ->
  -> list

module.exports =
  tests: { a, b, c }

