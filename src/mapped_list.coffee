class MappedList extends AbstractList

  entry: MappedEntry

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
      value = @mapFn(sourceItem)
      @set(id, value)

  getBySource: ( sourceEntry ) ->
    if sourceEntry
      return @_bySourceId[sourceEntry.id]
    return undefined

  createBySource: ( sourceEntry, options ) ->
    return @headEntry if sourceEntry is @source.headEntry
    return @tailEntry if sourceEntry is @source.tailEntry

    value = @mapFn(sourceEntry.value())
    entry = @_create(value, options)

    entry.source = sourceEntry
    @_bySourceId[sourceEntry.id] = entry
    return entry

  deleteBySource: ( sourceEntry, options ) ->
    sourceId = sourceEntry.id
    entry = @_bySourceId[sourceId]

    @_delete(entry, options)
    delete @_bySourceId[sourceId]


  before: ( id ) ->
    entry = @getEntry(id)
    if previous = entry.previous()
      return previous
    return undefined

  after: ( id ) ->
    entry = @getEntry(id)
    if next = entry.next()
      return next
    return undefined


