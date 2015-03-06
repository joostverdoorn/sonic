`
import AbstractList from "./abstract_list"
`


class ScanList extends AbtractList

  constructor: ( source, scanFn, initialValue ) ->
    @_source = source
    @_scanFn = scanFn
    @_byId[0] = initialValue

    super()

    @_source.onInvalidate ( event ) =>
      @_invalidate(event.prev)

    @onInvalidate ( event ) ->
      delete @_byId[id] while id = @_source.next(id or event.prev)

  get: ( id ) ->
    return @next(@prev(id)) if @_source.has(id)

  has: ( id ) ->
    return @_source.has(arguments...)

  prev: ( ) ->
    return @_source.prev(arguments...)

  next: ( ) ->
    return @_source.next(arguments...)

`
export default ScanList
`
