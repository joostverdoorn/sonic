class TailingEntry extends Entry

  constructor: ( source, options = {} ) ->
    @source = source or options.source
    super undefined, options
    debugger unless @source?

  value: ( ) ->
    return @_value ||= @source.value()

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

