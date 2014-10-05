class MappedEntry extends Entry

  constructor: ( options ) ->
    if options
      @source    = options.source
    super

  value: ( ) =>
    return @_value ||= @list.mapFn(@source.value())

  next: ( ) ->
    next = @_next
    return next if next

    if sourceNext = @source.next()
      next = @list.getBySource(sourceNext) or
             @list.createBySource(sourceNext, silent: true, previous: @) or
             null

      return @_next = next
    return null


  previous: ( ) ->
    previous = @_previous
    return previous if previous

    if sourcePrevious = @source.previous()
      previous = @list.getBySource(sourcePrevious) or
                 @list.createBySource(sourcePrevious, silent: true, next: @) or
                 null

      return @_previous = previous
    return null

