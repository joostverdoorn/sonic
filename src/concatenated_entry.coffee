class ConcatenatedEntry extends TailingEntry

  constructor: ( source, options = {} ) ->
    super source, options

  value: ( ) ->
    return @_value ||= @source.value()

  next: ( ) ->
    next = @_next
    return next if next

    sourceNext = @source.next()

    if sourceNext is @source.list.tailEntry
      nextSourceList = @list.sources.after(@source.list)
      sourceNext = nextSourceList.headEntry.next() if nextSourceList

    if sourceNext
      next = @list.getBySource(sourceNext) or
             @list.createBySource(sourceNext, silent: true, previous: @) or
             null

      return @_next = next
    return null

  previous: ( ) ->
    previous = @_previous
    return previous if previous

    sourcePrevious = @source.previous()

    if sourcePrevious is @source.list.headEntry
      previousSourceList = @list.sources.before(@source.list)
      sourcePrevious = nextSourceList.tailEntry.previous() if previousSourceList

    if sourcePrevious
      previous = @list.getBySource(sourcePrevious) or
                 @list.createBySource(sourcePrevious, silent: true, next: @) or
                 null

      return @_previous = previous
    return null

