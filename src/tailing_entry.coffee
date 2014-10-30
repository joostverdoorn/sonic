class TailingEntry extends Entry

  constructor: ( source, options = {} ) ->
    @source = source or options.source
    @source.on('update', @_onSourceUpdate, @) if @source

    super(undefined, options)

  root: ( ) ->
    return @source.root()

  value: ( ) ->
    @_value ?= @source.value()

  _onSourceUpdate: ( ) ->
    @_value = undefined
    @trigger('update', @)
