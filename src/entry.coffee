class Entry

  constructor: ( value, options ) ->
    if value?
      @_value = value
    else @_value = options.value

    @id = Sonic.uniqueId() or options.id

    if options
      @list     = options.list
      @next     = options.next
      @previous = options.previous

  root: ( ) ->
    return @

  value: ( ) ->
    @_value if @_value?

  setValue: ( value ) ->
    @_value = value

  getIterator: ( ) ->
    return @list.getIterator(@)

  remove: ( ) ->
    next = @next
    previous = @previous

    next.previous = previous if next
    previous.next = next if previous

    @next = null
    @previous = null
    return true

  attachNext: ( next ) ->
    @next = next
    @next.previous = @
    return true

  attachPrevious: ( previous ) ->
    @previous = previous
    @previous.next = @
    return true
