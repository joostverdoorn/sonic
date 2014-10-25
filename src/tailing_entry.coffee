class TailingEntry extends Entry

  constructor: ( source, options = {} ) ->
    @source = source or options.source
    super(undefined, options)

  root: ( ) ->
    return @source.root()

  value: ( ) ->
    @_value ?= @source.value()

  reset: ( ) ->
    @_value = undefined
