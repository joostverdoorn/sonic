
AbstractList = require( "./abstract_list")


class TakeList extends AbstractList

  constructor: ( source, count ) ->
    @_indexById = { 0: 0 }
    @_source = source
    @_count = count

    super()

    @_source.onInvalidate ( event ) =>
      @_invalidate(event.prev)

    @onInvalidate ( event ) =>
      delete @_indexById[id] while id = @_source.next(id or event.prev)

  get: ( id ) ->
    return @_source.get(id)

  has: ( id ) ->
    return @_source.has(id)

  prev: ( id = 0) ->


  next: ( id = 0 ) ->
    unless (i = @_indexById[id])?
      while prev = @_source.prev(prev or id)
        break if i = @_indexById[id]

      while next = @_source.next(next or prev)
        @_indexById[next] = i++
        break if next is id

    return if i >= @_count

    next = @_source.next(next or id)
    @_indexById[next] = ++i
    return next


module.exports = TakeList

