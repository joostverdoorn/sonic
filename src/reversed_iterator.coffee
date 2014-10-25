class ReversedIterator extends TailingIterator

  attachNext: ( ) ->
    return true if @entry.next

    iterator = @entry.source.getIterator()
    while iterator.movePrevious()
      next = @list.getBySource(iterator.entry)
      break if next

    return false unless next
    @entry.attachNext(next)

    return true

  attachPrevious: ( ) ->
    return true if @entry.previous

    iterator = @entry.source.getIterator()
    while iterator.moveNext()
      previous = @list.getBySource(iterator.entry)
      break if previous

    return false unless previous
    @entry.attachPrevious(previous)

    return true


