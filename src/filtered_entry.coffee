class FilteredEntry extends Entry

  constructor: ( id, list, source, options ) ->
    @id     = id
    @list   = list
    @source = source

    if options
      @_value    = options.value
      @_next     = options.next
      @_previous = options.previous

  value: ( ) ->
    return @_value ||= @source.value()

  next: ( ) ->
    if next = @_next
      return next

    source = @source
    filterFn = @list.filterFn

    while source = source.next()
      if filterFn(source.value())
        unless next = @list.getBySource(source)
          next = @list.createBySource(source, silent: true)
          next.setPrevious(@)

        return next

    return null

  previous: ( ) ->
    if previous = @_previous
      return previous

    source = @source
    filterFn = @list.filterFn

    while source = source.previous()
      if filterFn(source.value())
        return @_previous =
          @list.getBySource(source) ||
          @list.createBySource(source, silent: true, next: @)

    return null
