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
    until next?
      next = @list.getBySource(iterator.next().entry)

    return false unless next
    @entry.attachNext(next)

    return true

  attachPrevious: ( ) ->
    return true if @entry.previous

    iterator = @entry.source.getIterator()
    until previous?
      previous = @list.getBySource(iterator.previous().entry)

    return false unless previous
    @entry.attachPrevious(previous)

    return true
