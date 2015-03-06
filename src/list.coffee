AbstractList = require('./abstract_list')

class List extends AbstractList

  constructor: ( values ) ->
    super()

    @_move(0, next: 0)
    @_add(value, next: 0) for value in values if values?

  set: ( id, value ) ->
    return @_set(id, value)

  push: ( value ) ->
    return @_add(value, next: 0)

  unshift: ( value ) ->
    return @_add(value, prev: 0)

  pop: ( ) ->
    id = @prev()
    value = @get(id)
    return value if @_delete(id)

  shift: ( ) ->
    id = @next()
    value = @get(id)
    return value if @_delete(id)

  add: ( value ) ->
    return @push(value)

  remove: ( value ) ->
    id = @idOf(value)
    return @_delete(id)

  delete: ( id ) ->
    return @_delete(id)

module.exports = List
