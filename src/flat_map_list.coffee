class FlatMapList extends AbstractList

  constructor: ( origin, flatMapFn ) ->
    @_sourceIdById     = {}
    @_sourceBySourceId = {}

    super()

    @_origin = Sonic.create(origin)
    @_origin.events.forEach @_onOriginEvent
    @_flatMapFn = flatMapFn or ( value ) -> Sonic.unit(value)

  _getSourceBySourceId: ( sourceId ) ->
    return unless @_origin.has(sourceId)
    unless source = @_sourceBySourceId[sourceId]
      value = @_origin.get(sourceId)
      source = @_flatMapFn(value)
      source.events.forEach ( event ) -> @_onSourceEvent(event, sourceId)
      @_sourceBySourceId[sourceId] = source
    return source

  get: ( id ) ->
    if source = @_getSourceBySourceId(@_sourceIdById[id])
      return source.get(id)

  has: ( id ) ->
    return id of @_sourceIdById

  prev: ( id = 0 ) ->
    sourceId = if id isnt 0
      @_sourceIdById[id]
    else @_origin.prev()

    return null unless sourceId

    source = @_getSourceBySourceId(sourceId)
    prevId = source.prev(id)

    until prevId
      return null unless sourceId = @_origin.prev(sourceId)
      source = @_getSourceBySourceId(sourceId)
      prevId = source.prev()

    @_sourceIdById[prevId] = sourceId
    return prevId

  next: ( id = 0 ) ->
    sourceId = if id isnt 0
      @_sourceIdById[id]
    else @_origin.next()

    return null unless sourceId

    source = @_getSourceBySourceId(sourceId)
    nextId = source.next(id)

    until nextId
      return null unless sourceId = @_origin.next(sourceId)
      source = @_getSourceBySourceId(sourceId)
      nextId = source.next()

    @_sourceIdById[nextId] = sourceId
    return nextId

  _onOriginEvent: ( event ) =>

    iterator = @_origin.getIterator(event.prev)

    while iterator.moveNext() and iterator.currentId isnt event.next
      delete @_sourceBySourceId[iterator.currentId]


    prev = @_getSourceBySourceId(event.prev)?.prev()
    next = @_getSourceBySourceId(event.next)?.next()

    @_invalidate(prev, next)

  _onSourceEvent: ( event, sourceId ) =>
    prev = @_getSourceBySourceId(@_origin.prev(sourceId)).prev() unless prev = event.prev
    next = @_getSourceBySourceId(@_origin.next(sourceId)).next() unless next = event.next
    @_invalidate(prev, next)

