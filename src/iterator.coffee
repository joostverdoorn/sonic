class Iterator

  constructor: ( @list, @id ) ->

  current: ( ) ->
    @list.get(@id)

  moveNext: ( ) ->
    if @id = @list.after(@id)
      return true
    return false

  movePrevious: ( ) ->
    if @id = @list.before(@id)
      return true
    return false

