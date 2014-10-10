class FilteredEntry extends TailingEntry

  next: ( ) ->
    return @_next if @_next?

    source = @source
    while source = source.next()
      break if @list.filterFn(source.value())

    @attachNext @_next ||= @tail(source)

  previous: ( ) ->
    return @_previous if @_previous?

    source = @source
    while not @list.filterFn(source.previous())
      source = source.previous()

    @attachPrevious @_previous ||= @tail(source)
