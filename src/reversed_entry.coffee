class ReversedEntry extends TailingEntry

  previous: ( ) ->
    return null if @ is @list.headEntry
    previous = @_previous
    return previous if previous

    if sourceNext = @source.next()
      next = @list.getBySource(sourceNext) or
             @list.createBySource(sourceNext, silent: true, next: @) or
             null

      return @_previous = next
    return null


  next: ( ) ->
    return null if @ is @list.tailEntry
    next = @_next
    return next if next

    if sourcePrevious = @source.previous()
      previous = @list.getBySource(sourcePrevious) or
                 @list.createBySource(sourcePrevious, silent: true, previous: @) or
                 null

      return @_next = previous
    return null

