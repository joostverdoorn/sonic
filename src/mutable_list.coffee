AbstractList = require('./abstract_list')

class MutableList extends AbstractList

  delete: ( id ) ->
    return false unless @has(id)
    return @splice(@prev(id), @next(id))

  push: ( value ) ->
    @splice(@prev(), null, value)
    return @prev()

  unshift: ( value ) ->
    @splice(null, @prev(), value)
    return @next()

  pop: ( ) ->
    value = @last()
    @splice(@prev(@prev()), null)
    return value

  shift: ( ) ->
    value = @first()
    @splice(null, @next(@next()))
    return value

  remove: ( value ) ->
    id = @idOf(value)
    return @delete(id)


module.exports = MutableList
