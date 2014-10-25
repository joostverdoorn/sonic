class ConcatenatedList extends TailingList

  Iterator: ConcatenatedIterator

  constructor: ( sources, options = {} ) ->
    @sources = Sonic.create(sources)

    source =
      headEntry: @sources.first().headEntry
      tailEntry: @sources.last().tailEntry

    super source, options

  getBySource: ( sourceEntry ) ->
    listId = @sources.idOf(sourceEntry.list)

    sourceList = @sources.entryOf(listId)

    return @_bySourceId[listId][sourceEntry.id] or
      @_create(sourceEntry, silent: true)

  _create: ( sourceEntry, options = {} ) ->
    entry = super(sourceEntry, options)
    @_bySourceId[sourceEntry.id] = entry
    return entry
