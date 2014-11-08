class Entry extends Signal

  constructor: ( value, options = {} ) ->
    super()

    @id = options.id ? Sonic.uniqueId()
    @_value = value ? options.value

    if options
      @list     = options.list
      @next     = options.next
      @previous = options.previous

  root: ( ) ->
    return @

  value: ( ) ->
    if arguments.length > 0
      value = arguments[0]
      return if @_value is value

      oldValue = @_value
      @_value = value
      @trigger('update', @, oldValue)

    return @_value

  getIterator: ( ) ->
    return @list.getIterator(@)

  remove: ( ) ->
    next     = @next
    previous = @previous
    return true unless next or previous

    next.previous = previous if next
    previous.next = next if previous

    @next     = null
    @previous = null
    return true

  attachNext: ( next ) ->
    @next = next
    @next.previous = @ if next
    return true

  attachPrevious: ( previous ) ->
    @previous = previous
    @previous.next = @ if previous
    return true
