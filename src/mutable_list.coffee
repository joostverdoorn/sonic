AbstractList = require('./abstract_list')

class MutableList extends AbstractList

  constructor: ( ) ->
    super

  delete: ( id ) ->
    return @splice(@prev(id), @next(id))

  push: ( value ) ->
    return @splice(@prev(), null, value)

  unshift: ( value ) ->
    return @splice(null, @prev, value)

  pop: ( ) ->
    return @splice(@prev(@prev()), null)

  shift: ( ) ->
    return @splice(null, @next(@next()))

  remove: ( value ) ->
    id = @idOf(value)
    return @_delete(id)


module.exports = MutableList
