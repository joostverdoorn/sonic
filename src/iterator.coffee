class Iterator

  constructor: ( list, signal ) ->
    @list = list
    @start = @signal = signal

  current: ( ) ->
    return @signal.value()

  reset: () ->
    @signal = @start
    return @

  moveNext: ( ) ->
    @signal = @list.after @signal
    return @signal?

  movePrevious: ( ) ->
    @signal = @list.before @signal
    return @signal?

  # We also implement the ES6 iterator protocol.
  # https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/The_Iterator_protocol
  next: ( ) ->
    if @moveNext()
      return { value: @current(), done: false, signal: @signal }
    else return { done: true, signal: @signal }

  previous: ( ) ->
    if @movePrevious()
      return { value: @current(), done: false, signal: @signal }
    else return { done: true, signal: @signal }
