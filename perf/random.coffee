Sonic   = require('../dist/sonic')

# list = Sonic(3)

a = do ( ) ->
  list = Sonic([0...1000])
  -> list.toArray()

b = do ( ) ->
  list = Sonic([0...1000])
  mapped = list.map (x)->x*2
  -> mapped.toArray()

c = do ( ) ->
  list = Sonic([0...1000])
  filtered = list.map (x)->x%2==0
  -> filtered.toArray()

c = do ( ) ->
  list = Sonic([0...1000])
  filtered = list.map (x)->x%2==0
  -> filtered.toArray()


module.exports =
  tests: { a, b, c }
