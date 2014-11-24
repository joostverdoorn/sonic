class MappedSignal extends Signal

  constructor: ( source, mapFn = @_noop ) ->
    if @_source = source
      @_source.each @yield
    @_mapFn = mapFn

    super undefined

  value: ( ) ->
    return @_value ?= @_mapFn(@_source.value())

  yield: ( value ) ->
    return super(@_mapFn(value))

  root: ( ) ->
    return @_source?.root()

  _noop: ( item ) -> item
