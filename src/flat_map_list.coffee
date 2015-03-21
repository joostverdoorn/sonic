AbstractList = require('./abstract_list')
Unit         = require('./unit')

class FlatMapList extends AbstractList

  constructor: ( source, flatMapFn ) ->
    super()

    @_source = source
    @_source.onInvalidate @_onSourceInvalidate

    @_sourceIdById   = {}
    @_listBySourceId = {}
    @_flatMapFn      = flatMapFn or ( value ) -> new Unit(value)

  get: ( id ) ->
    return list.get(id) if list = @_getListById(id)

  has: ( id ) ->
    return !!id and id of @_sourceIdById

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

  _getListById: ( id ) ->
    if sourceId = @_sourceIdById[id]
      return @_getListBySourceId(sourceId)

  _getListBySourceId: ( sourceId, lazy = false ) ->
    if (list = @_listBySourceId[sourceId]) or lazy
      return list
    return unless @_source.has(sourceId)

    list = @_flatMapFn(@_source.get(sourceId))
    list.onInvalidate ( event ) => @_onListInvalidate(event, sourceId)
    @_listBySourceId[sourceId] = list

    return list

  _onSourceInvalidate: ( prev, next ) =>

    # Find the list that contains the prev of our invalidated region
    unless prevList = @_getListBySourceId(prev, lazy: true)
      prev = @_source.prev(prev) until prevList = @_getListBySourceId(prev, lazy: true)
    prev = prevList.prev(0)

    # Find the list that contains the next of our invalidated region
    unless nextList = @_getListBySourceId(next, lazy: true)
      next = @_source.next(next) until nextList = @_getListBySourceId(next, lazy: true)
    next = nextList.next(0)


    # # Find the list that contains the next of our invalidated region
    # nextList = @_getListBySourceId(event.next, lazy: true)
    # if nextList?
    #   next = nextList.next(0, lazy: true)
    # else next = event.next

    iterator = @_source.getIterator(prev)
    while iterator.moveNext() and iterator.current() isnt next
      delete @_sourceIdById[iterator.currentId]

    @_invalidate(prev, next)

  _onListInvalidate: ( prev, next ) =>
    prev = @_getListBySourceId(@_source.prev(sourceId)).prev() unless prev?
    next = @_getListBySourceId(@_source.next(sourceId)).next() unless next?
    @_invalidate(prev, next)


module.exports = FlatMapList

