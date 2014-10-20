class Iterator

  constructor: ( list, entry ) ->
    @list = list
    @start = @entry = entry

  current: ( ) ->
    return @entry.value()

  reset: () ->
    @entry = @start
    return @

  moveNext: ( ) ->
    @entry = @entry.next
    return @entry? and @entry isnt @list.tailEntry

  movePrevious: ( ) ->
    @entry = @entry.previous
    return @entry? and @entry isnt @list.headEntry

  # We also implement the ES6 iterator protocol.
  # https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/The_Iterator_protocol
  next: ( ) ->
    if @moveNext()
      return { value: @current(), done: false, entry: @entry }
    else return { done: true, entry: @entry }

  previous: ( ) ->
    if @movePrevious()
      return { value: @current(), done: false, entry: @entry }
    else return { done: true, entry: @entry }

