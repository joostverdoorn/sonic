factory      = require('./factory')
AbstractList = require('./abstract_list')
Unit         = require('./unit')

class FlatMapList extends AbstractList

  constructor: ( source, flatMapFn ) ->
    super()

    @_sourceIdById   = {}
    @_listBySourceId = {}

    @_source = factory(source)
    @_source.onInvalidate @_onSourceInvalidate

    @_flatMapFn = factory(flatMapFn or ( value ) -> new Unit(value))
    @_flatMapFn.onInvalidate @_onFlatMapFnInvalidate

  # Returns the value at the given id. If the given id is not yet
  # evaluated or not present at all, returns undefined.
  #
  # @param [number] id The id to retrieve the value of
  # @return [any] The value
  #
  get: ( id ) ->
    return list.get(id) if list = @_getListById(id)


  # Checks whether or not the given id is evaluated.
  #
  # @param [number] id The id to check
  # @return [boolean] Whether or not the given id is present
  #
  has: ( id ) ->
    return !!id and id of @_sourceIdById

  # Returns the id that precedes the given id.
  #
  # @param [number] id The id from which to find the previous
  # @return [number] The id that precedes the given id
  #
  prev: ( id = 0 ) ->
    unless id then sourceId = @_source.prev()
    else sourceId = @_sourceIdById[id]
    return null unless sourceId?

    list = @_getListBySourceId(sourceId)
    prev = list.prev(id)

    until prev?
      return null unless (sourceId = @_source.prev(sourceId))?
      list = @_getListBySourceId(sourceId)
      prev = list.prev()

    @_sourceIdById[prev] = sourceId
    return prev

  # Returns the id that succeeds the given id.
  #
  # @param [number] id The id from which to find the next
  # @return [number] The id that succeeds the given id
  #
  next: ( id = 0 ) ->
    unless id then sourceId = @_source.next()
    else sourceId = @_sourceIdById[id]
    return null unless sourceId?

    list = @_getListBySourceId(sourceId)
    next = list.next(id)

    until next?
      return null unless (sourceId = @_source.next(sourceId))?
      list = @_getListBySourceId(sourceId)
      next = list.next()

    @_sourceIdById[next] = sourceId
    return next

  # Returns the list corresponding to the given sourceId.
  # When the list was not yet created, it will call the
  # flatMapFn on the value corresponding to the sourceId.
  #
  # @param [number] sourceId The id to get the corresponding list of
  # @return [AbstractList] The list corresponding to the id
  #
  _getListBySourceId: ( sourceId ) ->
    return list if list = @_listBySourceId[sourceId]
    return unless @_source.has(sourceId)

    list = @_flatMapFn.last()(@_source.get(sourceId), sourceId).indexBy()
    list.onInvalidate ( prev, next ) => @_onListInvalidate(sourceId, prev, next)

    @_listBySourceId[sourceId] = list
    return list

  # Returns the list in which the given id is present.
  # When the given id was not yet evaluated, or isn't
  # valid, will return undefined.
  #
  # @param [number] id The id for which to get the list
  # @return [AbstractList] The list from which the id is drawn
  #
  _getListById: ( id ) ->
    return @_getListBySourceId(@_sourceIdById[id])

  # Is called when the source is invalidated. This will
  # find the nearest ids corresponding to the range and
  # invalidate that range.
  #
  # @param [number] sourcePrev The id previous of the range in the source
  # @param [number] sourceNext The id next of the range in the source
  # @return [boolean] Whether or not to keep listening
  #
  _onSourceInvalidate: ( sourcePrev, sourceNext ) =>
    if sourcePrev?
      while sourcePrev = @_source.prev(sourcePrev)
        break if prevList = @_listBySourceId[sourcePrev]
      prev = prevList?.prev() or 0
    else prev = @_source.next()

    if sourceNext?
      while sourceNext = @_source.next(sourceNext)
        break if nextList = @_listBySourceId[sourceNext]
      next = nextList?.next() or 0
    else next = @_source.prev()

    @_invalidate(prev, next)
    return true

  # Is called when a list is invalidated. This will
  # either call invalidate with the given next and
  # previous when they are present, or invalidate
  # from the nearest next and previous.
  #
  # @param [number] sourceId The sourceId corresponding to the invalidated list
  # @param [number] prev The id previous of the invalidated range
  # @param [number] next The id next of the invalidated range
  # @return [boolean] Whether or not to keep listening
  #
  _onListInvalidate: ( sourceId, prev, next ) =>
    return false unless list = @_listBySourceId[sourceId]

    prev ||= @_getListBySourceId(@_source.prev(sourceId))?.prev() or 0
    next ||= @_getListBySourceId(@_source.next(sourceId))?.next() or 0

    @_invalidate(prev, next)
    return true

  # Is called when the flatMapFn is invalidated. When the
  # invalidated range includes the last item, the entire
  # list is invalited.
  #
  # @param [number] prev The id previous of the invalidated range
  # @param [number] next The id next of the invalidated range
  # @return [boolean] Whether or not to keep listening
  #
  _onFlatMapFnInvalidate: ( prev, next ) =>
    @_invalidate() if !next
    return true

  # Invalidates a range given by the prev and next. This will
  # delete all computed lists within that range and notify
  # all handlers.
  #
  # @param [number] prev The id previous of the invalidated range
  # @param [number] next The id next of the invalidated range
  #
  _invalidate: ( prev = 0, next = 0 ) ->
    sourcePrev = @_sourceIdById[prev]
    sourceNext = @_sourceIdById[next]

    while sourcePrev = @_source.next(sourcePrev)
      break if sourcePrev is sourceNext
      delete @_listBySourceId[sourcePrev]

    while sourceNext = @_source.next(sourceNext)
      break if sourceNext is sourcePrev
      delete @_listBySourceId[sourceNext]

    super(prev, next)

module.exports = FlatMapList

