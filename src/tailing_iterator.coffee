class TailingIterator extends Iterator

  moveNext: ( ) ->
    @attachNext() unless @entry.next
    super

  movePrevious: ( ) ->
    @attachPrevious() unless @entry.previous
    super

