class ReversedEntry extends TailingEntry

  previous: ( ) ->
    return null if @ is @list.headEntry
    @_previous ||= @tail(@source.next())


  next: ( ) ->
    return null if @ is @list.tailEntry
    @_next ||= @tail(@source.previous())
