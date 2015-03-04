`
import AbstractList from "./abstract_list"
`

class TakeList extends AbstractList

  constructor: ( source, count ) ->
    @_orderById = {}

    super()

    @_source.events.forEach ( event ) ->
      @_invalidate(event.prev)



  _invalidate: ( prev ) ->
    delete @_orderById[id] while id = @_source.next(id or prev)
    super(prev)


  prev: ( id ) ->



  next: ( id ) ->
    i = @_orderById[id]

    unless @_orderById(id)
      until next is id
        next = @_source.next(next or id)
        i = @_orderById[next]


    @_source.next(id)



  get: ( id ) ->
    return @_source.get(id)

  has: ( id ) ->
    return @_source.has(id)


`
export default Takelist
`
