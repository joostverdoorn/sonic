class Signal

  constructor: ( ) ->
    @_handlers = []


  value: ( ) ->
    return @_value

  set: ( value ) ->
    @_value = value
    @yield(value)

  yield: ( value ) ->
    @_handlers.forEach ( handler ) -> handler(value)

  forEach: ( handler ) ->
    @_handlers.push(handler)
