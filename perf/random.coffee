global.Sonic = require('../dist/sonic.browser')
global.x = [];

a = do ( ) ->
  ->
    y = [];
    y.push(5) for i in [0...1000]

b = do ( ) ->
  ->
    y = [];
    y[i] = 5 for i in [0...1000]

module.exports =
  tests: { a, b }
