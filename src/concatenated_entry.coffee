class ConcatenatedEntry extends TailingEntry

  next: ( ) ->
    return @_next if @_next?

    sourceNext = @source.next

    if sourceNext is @source.list.tailEntry
      nextSourceList = @list.sources.after(@source.list)
      sourceNext = nextSourceList.headEntry.next if nextSourceList

    @_next ||= @tail(sourceNext)

  previous: ( ) ->
    return @_previous if @_previous?

    sourcePrevious = @source.previous

    if sourcePrevious is @source.list.headEntry
      previousSourceList = @list.sources.before(@source.list)
      sourcePrevious = nextSourceList.tailEntry.previous if previousSourceList

    @_previous ||= @tail(sourcePrevious)

