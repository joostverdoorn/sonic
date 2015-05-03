List = require('./list')

class MutableList extends List

  @isMutableList: ( obj ) ->
    List.isList(obj) and !!obj.set and !!obj.splice

  @create: ( obj ) ->
    return unless MutableList.isMutableList(obj)

    list = new MutableList
    list[key] = obj[key] for key in ['has', 'get', 'next', 'prev', 'splice']
    return list

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
