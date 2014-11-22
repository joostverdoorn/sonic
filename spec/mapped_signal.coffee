class MappedSignal extends Signal

  constructor: ( source, mapFn = @_noop ) ->
    @_source = source
    @_mapFn = mapFn

    super undefined

  value: ( ) ->
    @_value ?= @_mapFn @_source

  yield: ( value ) ->
    @_value = value
    @_handlers.forEach ( handler ) -> handler(value)

  each: ( handler ) ->
    @forEach(handler)

  forEach: ( handler ) ->
    @_handlers.push(handler)


  _noop: ( item ) -> item
