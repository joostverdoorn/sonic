class TailingIterator extends Iterator

  moveNext: ( ) ->
    @_attachNext() unless @entry.next
    super

  movePrevious: ( ) ->
    @_attachPrevious() unless @entry.previous
    super

  _attachNext: ( ) ->
    return true if @entry.next

    nextSource = @entry.source.getIterator().next().entry
    return false unless nextSource

    next = @list.getBySource(nextSource)
    @entry.attachNext(next)

    return true

  _attachPrevious: ( ) ->
    return true if @entry.previous

    previousSource = @entry.source.getIterator().previous().entry
    return false unless previousSource

    previous = @list.getBySource(previousSource)
    @entry.attachPrevious(previous)

    return true
