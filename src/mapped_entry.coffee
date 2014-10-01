class MappedEntry extends Entry

  constructor: ( options ) ->
    if options
      @id        = options.id
      @list      = options.list
      @source    = options.source
      @_next     = options.next
      @_previous = options.previous

  value: ( ) ->
    return @_value ||= @list.mapFn(@source.value())

  next: ( ) ->
    return @_next ||=
      @list.getBySource(@source.next()) ||
      @list.createBySource(@source.next(), silent: true, previous: @) ||
      null

  previous: ( ) ->
    return @_previous ||=
      @list.getBySource(@source.previous()) ||
      @list.createBySource(@source.previous(), silent: true, next: @) ||
      null


