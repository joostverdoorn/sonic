class TailingIterator extends Iterator

  moveNext: ( ) ->
    @attachNext() unless @entry.next
    super

  movePrevious: ( ) ->
    @attachPrevious() unless @entry.previous
    super

  attachNext: ( ) ->
    return true if @entry.next

    iterator = @entry.source.getIterator()
    while iterator.moveNext()
      next = @list.getBySource(iterator.entry)
      break if next

    return false unless next
    @entry.attachNext(next)

    return true

  attachPrevious: ( ) ->
    return true if @entry.previous

    iterator = @entry.source.getIterator()
    while iterator.movePrevious()
      previous = @list.getBySource(iterator.entry)
      break if previous

    return false unless previous
    @entry.attachPrevious(previous)

    return true
