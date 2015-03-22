Sonic   = require('../../dist/sonic')
factory = require('../../dist/factory')

list = Sonic([0...100])

a = do ( list ) ->
  -> list.get(list.prev())

b = do ( list ) ->
  -> list.last()

c = do ( list ) ->
  -> list

module.exports =
  tests: { a, b, c }

