`
import AbstractList from "./abstract_list"
`

class TakeList extends AbstractList

  constructor: ( source, count ) ->
    @_orderById = { 0: 0 }
    @_source = source
    @_count = count

    super()

    @_source.onInvalidate ( event ) =>
      @_invalidate(event.prev)

    @onInvalidate ( event ) ->
      delete @_orderById[id] while id = @_source.next(id or event.prev)

  get: ( id ) ->
    return @_source.get(id)

  has: ( id ) ->
    return @_source.has(id)

  prev: ( id ) ->
    throw Error("Not implemented yet.")

  next: ( id = 0 ) ->
    unless (i = @_orderById[id])?
      while prev = @_source.prev(prev or id)
        break if i = @_orderById[id]

      while next = @_source.next(next or prev)
        @_orderById[next] = i++
        break if next is id

    return if i >= @_count

    next = @_source.next(next or id)
    @_orderById[next] = ++i
    return next

`
export default TakeList
`
