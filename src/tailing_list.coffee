class TailingList extends AbstractList

  Entry: TailingEntry

  constructor: ( source, options = {} ) ->
    super options
    @source = source

    @_bySourceId = []

    @headEntry.source = @source.headEntry
    @tailEntry.source = @source.tailEntry

  getBySource: ( sourceEntry ) ->
    if sourceEntry
      return @_bySourceId[sourceEntry.id]
    return undefined

  createBySource: ( sourceEntry, options ) ->
    return @headEntry if sourceEntry is @source.headEntry
    return @tailEntry if sourceEntry is @source.tailEntry

    entry = @_create(sourceEntry, options)
    @_bySourceId[sourceEntry.id] = entry

    return entry

  deleteBySource: ( sourceEntry, options ) ->
    sourceId = sourceEntry.id
    entry = @_bySourceId[sourceId]

    @_delete(entry, options)
    delete @_bySourceId[sourceId]
