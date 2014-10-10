class Entry

  constructor: ( value, options ) ->
    if value?
      @_value = value
    else @_value = options.value

    @id = Sonic.uniqueId()
    if options
      @list      = options.list
      # @_next     = options.next
      # @_previous = options.previous

  root: ( ) ->
    return @

  value: ( ) ->
    @_value if @_value?

  next: ( ) ->
    @attachNext @_next if @_next

  previous: ( ) ->
    if @_previous?
      @_previous.setNext @
    return @_previous

  setNext: ( next ) ->
    @_next = next
    return @

  setPrevious: ( previous ) ->
    @_previous = previous
    return @

  attachNext: ( next ) ->
    @setNext next
    @_next.setPrevious @

  attachPrevious: ( previous ) ->
    @setPrevious previous
    @_previous.setNext @
    return @
