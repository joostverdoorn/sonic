class TailingEntry extends Entry

  constructor: ( source, options = {} ) ->
    @source = source or options.source
    super undefined, options

  root: ( ) ->
    return @source.root()

  value: ( ) ->
    @_value ||= @source.value()

  next: ( ) ->
    sourceNext = @source.next()
    @_next ||= super() or @tail(sourceNext)

  previous: ( ) ->
    sourcePrevious = @source.previous()
    @_previous ||= super() or @tail(sourcePrevious)

  tail: ( source ) ->
    @list.getBySource(source) or
    @list.createBySource(source, silent: true, previous: @) or
    null
