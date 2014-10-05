class Entry

  constructor: ( options ) ->
    if options
      @id        = options.id
      @list      = options.list
      @_value    = options.value
      @_next     = options.next
      @_previous = options.previous

  value: ( ) ->
    return @_value

  next: ( ) ->
    return @_next

  setNext: ( next ) ->
    @_next = next

  previous: ( ) ->
    return @_previous

  setPrevious: ( previous ) ->
    @_previous = previous


