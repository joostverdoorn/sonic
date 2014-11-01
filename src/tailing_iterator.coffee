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
    next = @list.getBySource(iterator.next().entry) until next

    return false unless next
    @entry.attachNext(next)

    return true

  attachPrevious: ( ) ->
    return true if @entry.previous

    iterator = @entry.source.getIterator()
    previous = @list.getBySource(iterator.previous().entry) until previous

    return false unless previous
    @entry.attachPrevious(previous)

    return true
