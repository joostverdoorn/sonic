class FilteredIterator extends TailingIterator

  _attachNext: ( ) ->
    return true if @entry.next

    iterator = @entry.source.getIterator()
    filterFn = @list.filterFn

    while iterator.moveNext()
      break if filterFn(iterator.current())

    next = @list.getBySource(iterator.entry)
    @entry.attachNext(next)

    return true

  _attachPrevious: ( ) ->
    return true if @entry.previous

    iterator = @entry.source.getIterator()
    filterFn = @list.filterFn

    while iterator.movePrevious()
      break if filterFn(iterator.current())

    previous = @list.getBySource(iterator.entry)
    @entry.attachPrevious(previous)

    return true
