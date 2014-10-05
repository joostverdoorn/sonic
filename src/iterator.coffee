class Iterator

  constructor: ( list, entry ) ->
    @list = list
    @entry = entry

  current: ( ) ->
    @entry.value()

  moveNext: ( ) ->
    @entry = @entry.next()
    return @entry? and @entry isnt @list.tailEntry

  movePrevious: ( ) ->
    @entry = @entry.previous()
    return @entry? and @entry isnt @list.headEntry

