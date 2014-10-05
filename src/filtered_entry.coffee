class FilteredEntry extends TailingEntry

  value: ( ) ->
    return @_value ||= @source.value()

  next: ( ) ->
    next = @_next
    return next if next

    source = @source
    while source = source.next()
      break if @list.filterFn(source.value())


    if source
      next = @list.getBySource(source) or
             @list.createBySource(source, silent: true, previous: @) or
             null

      return @_next = next
    return null

  previous: ( ) ->
    previous = @_previous
    return previous if previous

    source = @source
    while not @list.filterFn(source.previous())
      source = source.previous()


    if source
      previous = @list.getBySource(source) or
             @list.createBySource(source, silent: true, previous: @) or
             null

      return @_previous = previous
    return null
