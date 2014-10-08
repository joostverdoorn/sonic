class Entry

  constructor: ( value, options ) ->
    if value?
      @_value = value
    else @_value = options.value

    if options
      @id        = options.id
      @list      = options.list
      # @_next     = options.next
      # @_previous = options.previous

  root: ( ) ->
    return @

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


