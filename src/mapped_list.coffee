class MappedList extends AbstractList

  constructor: ( @source, @mapFn ) ->
    super

    @_sourceIdById = {}
    @_idBySourceId = {}

    @_sourceIdById[@headId] = @source.headId
    @_sourceIdById[@tailId] = @source.tailId
    @_idBySourceId[@source.headId] = @headId
    @_idBySourceId[@source.tailId] = @tailId

    @source.on 'create', ( sourceId ) =>
      sourceItem = @source.get(sourceId)
      item = @mapFn(sourceItem)
      id = @create item

      @_sourceIdById[id] = sourceId
      @_idBySourceId[sourceId] = id

    @source.on 'delete', ( sourceId ) =>
      id = @_idBySourceId[sourceId]
      @delete id

      delete @_idBySourceId[sourceId]
      delete @_sourceIdById[id]

    @source.on 'move', ( sourceId ) =>
      id = @_idBySourceId[sourceId]
      beforeSourceId = @source.before(sourceId)
      afterSourceId = @source.after(sourceId)
      beforeId = @_idBySourceId[beforeId]
      afterId = @_idBySourceId[afterId]

      @move(id, before: beforeId, after: afterId)

    @source.on 'change', ( sourceId, sourceItem ) ->
      id = @_idBySourceId[sourceId]
      item = @mapFn(sourceItem)
      @set(id, item)

  before: ( id ) ->
    beforeId = @_before[id]
    if beforeId
      return beforeId if beforeId isnt @headId
      return undefined

    sourceId = @_sourceIdById[id]
    beforeSourceId = @source.before(sourceId)
    if beforeSourceId
      beforeId = @_idBySourceId[beforeSourceId]
      if beforeId
        @move(beforeId, before: id)
        return beforeId

      item = @mapFn(@source.get(beforeSourceId))
      beforeId = @insert(item, before: id, silent: true)

      @_sourceIdById[beforeId] = beforeSourceId
      @_idBySourceId[beforeSourceId] = beforeId

      return beforeId

    return undefined

  after: ( id ) ->
    afterId = @_after[id]
    if afterId
      return afterId if afterId isnt @tailId
      return undefined

    sourceId = @_sourceIdById[id]
    afterSourceId = @source.after(sourceId)
    if afterSourceId
      afterId = @_idBySourceId[afterSourceId]
      if afterId
        @move(afterId, after: id, silent: true)
        return afterId

      item = @mapFn(@source.get(afterSourceId))
      afterId = @insert(item, after: id, silent: true)

      @_sourceIdById[afterId] = afterSourceId
      @_idBySourceId[afterSourceId] = afterId

      return afterId

    return undefined




