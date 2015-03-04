`
import AbstractList from './abstract_list'
import Unit         from './unit'
`

console.log "AbstractList:", AbstractList

class FlatMapList extends AbstractList

  constructor: ( source, flatMapFn ) ->
    super()

    @_source = Sonic.create(source)
    @_source.events.forEach @_onSourceEvent

    @_sourceIdById   = {}
    @_listBySourceId = {}
    @_flatMapFn      = flatMapFn or Sonic.unit

  _getListById: ( id ) ->
    if sourceId = @_sourceIdById[id]
      return @_getListBySourceId(sourceId)

  _getListBySourceId: ( sourceId ) ->
    return list if list = @_listBySourceId[sourceId]
    return unless @_source.has(sourceId)

    list = @_flatMapFn(@_source.get(sourceId))
    list.events.forEach ( event ) => @_onListEvent(event, sourceId)
    @_listBySourceId[sourceId] = list

    return list

  prev: ( id = 0 ) ->
    unless id then sourceId = @_source.prev()
    else sourceId = @_sourceIdById[id]
    return unless sourceId

    list = @_getListBySourceId(sourceId)
    prev = list.prev(id)

    until prev
      return unless sourceId = @_source.prev(sourceId)
      list = @_getListBySourceId(sourceId)
      prev = list.prev()

    @_sourceIdById[prev] = sourceId
    return prev

  next: ( id = 0 ) ->
    unless id then sourceId = @_source.next()
    else sourceId = @_sourceIdById[id]
    return unless sourceId

    list = @_getListBySourceId(sourceId)
    next = list.next(id)

    until next
      return unless sourceId = @_source.next(sourceId)
      list = @_getListBySourceId(sourceId)
      next = list.next()

    @_sourceIdById[next] = sourceId
    return next

  get: ( id ) ->
    return list.get(id) if list = @_getListById(id)

  has: ( id ) ->
    return id of @_sourceIdById or id is 0

  _onSourceEvent: ( event ) =>
    prev = @_getListBySourceId(event.prev)?.prev(0, lazy: true)
    next = @_getListBySourceId(event.next)?.next(0, lazy: true)
    @_invalidate(prev, next)

  _onListEvent: ( event, sourceId ) =>
    prev = @_getListBySourceId(@_origin.prev(sourceId)).prev() unless prev = event.prev
    next = @_getListBySourceId(@_origin.next(sourceId)).next() unless next = event.next
    @_invalidate(prev, next)

`
export default FlatMapList
`
