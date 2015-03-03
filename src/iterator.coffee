class Iterator

  constructor: ( list, startId ) ->
    @list = list
    @currentId = @startId = startId

  current: ( ) ->
    return @list.get(@currentId)

  reset: ( ) ->
    @currentId = @startId
    return @

  moveNext: ( ) ->
    @currentId = @list.next(@currentId)
    return @currentId?

  movePrevious: ( ) ->
    @currentId = @list.prev(@currentId)
    return @currentId?

  # We also implement the ES6 iterator protocol.
  # https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/The_Iterator_protocol
  next: ( ) ->
    if @moveNext()
      return { value: @current(), done: false, id: @currentId }
    else return { done: true, id: @currentId }

  previous: ( ) ->
    if @movePrevious()
      return { value: @current(), done: false, id: @currentId }
    else return { done: true, id: @currentId }
