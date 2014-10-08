class TailingList extends AbstractList

  Entry: TailingEntry

  HeadEntry: -> new @Entry @source.headEntry, list: @
  TailEntry: -> new @Entry @source.tailEntry, list: @

  constructor: ( source, options = {} ) ->
    @source = source
    @_bySourceId = {}

    super options

  getBySource: ( sourceEntry ) ->
    return @headEntry if sourceEntry is @headEntry.source
    return @tailEntry if sourceEntry is @tailEntry.source

    if sourceEntry
      return @_bySourceId[sourceEntry.id]
    return undefined

  createBySource: ( sourceEntry, options ) ->
    return @headEntry if sourceEntry is @headEntry.source
    return @tailEntry if sourceEntry is @tailEntry.source

    entry = @_create(sourceEntry, options)
    @_bySourceId[sourceEntry.id] = entry

    return entry

  deleteBySource: ( sourceEntry, options ) ->
    sourceId = sourceEntry.id
    entry = @_bySourceId[sourceId]

    @_delete(entry, options)
    delete @_bySourceId[sourceId]
