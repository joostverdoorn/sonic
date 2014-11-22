class Signal

  constructor: ( value ) ->
    @_handlers = []
    @id = Sonic.uniqueId()
    @_value = value


  value: ( ) ->
    return @_value



  yield: ( value ) ->
    @_value = value
    @_handlers.forEach ( handler ) -> handler(value)


  each: ( handler ) ->
    @forEach(handler)

  forEach: ( handler ) ->
    @_handlers.push(handler)


  _noop: ( item ) -> item
