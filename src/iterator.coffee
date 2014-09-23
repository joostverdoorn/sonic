class Iterator

  constructor: ( @list, @entry ) ->

  current: ( ) ->
    @entry.item

  moveNext: ( ) ->
    if @entry = @list.after(@entry)
      return true
    return false

  movePrevious: ( ) ->
    if @entry = @list.before(@entry)
      return true
    return false

