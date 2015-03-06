class Signal

  constructor: ( value ) ->
    @id = Sonic.uniqueId()

    @_handlers = []
    @_value = value

  value: ( ) ->
    return @_value

  yield: ( value ) ->
    @_value = value
    toRemove = []

    @_handlers.forEach ( handler ) =>
      res = handler(value, @)
      toRemove.push res unless res
      return res

    for item in toRemove
      index = @_handlers.indexOf(item)
      @_handlers.splice(index, 1)

    return true

  each: ( handler ) ->
    @forEach(handler)

  forEach: ( handler ) ->
    @_handlers.push(handler)

  root: ( ) ->
    return @

module.exports = Signal

