class MappedList extends AbstractList

  constructor: ( @source, @mapFn ) ->
    super

    @_bySourceId = []

    @headEntry.source = @source.headEntry
    @tailEntry.source = @source.tailEntry

    @source.on 'create', ( sourceEntry ) =>
      @_createBySourceEntry(sourceEntry)

    @source.on 'delete', ( sourceEntry ) =>
      @_deleteBySourceEntry(sourceEntry)

    @source.on 'move', ( sourceEntry ) =>
      entry = @_bySourceId[sourceEntry.id]

      beforeSourceEntry = @source.before(sourceEntry)
      afterSourceEntry = @source.after(sourceEntry)

      before = @_bySourceId[beforeSourceEntry.id]
      after = @_bySourceId[afterSourceEntry.id]

      # @move(entry, before: )

    @source.on 'change', ( sourceId, sourceItem ) ->
      id = @_idBySourceId[sourceId]
      item = @mapFn(sourceItem)
      @set(id, item)

  getBySource: ( sourceEntry ) ->
    @_bySourceId[sourceEntry.id]

  createBySource: ( sourceEntry, options ) ->
    item = @map(sourceEntry.item)
    entry = @_create(item, options)

    entry.source = sourceEntry
    @_bySourceId[sourceEntry.id] = entry
    return entry

  deleteBySource: ( sourceEntry, options ) ->
    sourceId = sourceEntry.id
    entry = @_bySourceId[sourceId]

    @_delete(entry, options)
    delete @_bySourceId[sourceId]


  before: ( id ) ->
    beforeId = @_before[id]
    if beforeId
      return beforeId if beforeId isnt @headEntry
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
      return afterId if afterId isnt @tailEntry
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




