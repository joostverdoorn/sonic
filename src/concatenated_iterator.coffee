class ConcatenatedIterator extends TailingIterator

  _attachNext: ( ) ->
    return true if @entry.next

    nextSource = @entry.source.getIterator().next().entry
    return false unless nextSource


    if nextSource is @source.list.tailEntry
      nextSourceList = @list.sources.after(@source.list)
      nextSource = nextSourceList.headEntry.next if nextSourceList

    next = @list.getBySource(nextSource)
    @entry.attachNext(next)

    return true

  _attachPrevious: ( ) ->
    return @_previous if @_previous?

    sourcePrevious = @source.previous

    if sourcePrevious is @source.list.headEntry
      previousSourceList = @list.sources.before(@source.list)
      sourcePrevious = nextSourceList.tailEntry.previous if previousSourceList

    @_previous ||= @tail(sourcePrevious)

