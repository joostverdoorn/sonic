List = require('./list')

class Unit extends List

  constructor: ( value ) ->
    values = if arguments.length then [value] else []
    super(values)

  push: ( value ) ->
    return @_add(value, 0, 0)

  unshift: ( value ) ->
    return @push(value)

  pop: ( ) ->
    value = @last()
    @_splice(0, 0)
    return value

  shift: ( ) ->
    return @pop()

module.exports = Unit
