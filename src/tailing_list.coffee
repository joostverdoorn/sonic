class TailingList extends AbstractList

  Entry:    TailingEntry
  Iterator: TailingIterator

  HeadEntry: -> new @Entry(null, list: @, source: @source.headEntry)
  TailEntry: -> new @Entry(null, list: @, source: @source.tailEntry)

  constructor: ( source, options = {} ) ->
    @source = source
    @_bySourceId = {}

    @source.on('create', @_onSourceCreate, @)
    @source.on('delete', @_onSourceDelete, @)
    @source.on('update', @_onSourceUpdate, @)
    @source.on('move',   @_onSourceMove,   @)

    super options

  getBySource: ( sourceEntry ) ->
    return @headEntry if sourceEntry is @headEntry.source
    return @tailEntry if sourceEntry is @tailEntry.source

    entry = @_bySourceId[sourceEntry.id] or
      @_create(sourceEntry, silent: true)
    return entry

  _create: ( sourceEntry, options = {} ) ->
    entry = super(sourceEntry, options)
    @_bySourceId[sourceEntry.id] = entry
    return entry

  _delete: ( entry, options = {} ) ->
    delete @_bySourceId[entry.source.id]
    super(entry, options)

  _set: ( entry, options = {} ) ->
    entry.reset()
    @trigger('update', entry.id, entry.value())
    return true

  _move: ( entry, options = {} ) ->
    @_remove(entry, silent: true)

    iterator = @getIterator(entry)
    iterator.attachNext()
    iterator.attachPrevious()

    @trigger('move', entry.id) unless options.silent
    return true

  _onSourceCreate: ( sourceId ) ->
    sourceEntry = @source.getEntry(sourceId)
    @_create(sourceEntry)

  _onSourceDelete: ( sourceId ) ->
    entry = @_bySourceId[sourceId]
    @_delete(entry) if entry

  _onSourceUpdate: ( sourceId, value ) ->
    entry = @_bySourceId[sourceId]
    @_set(entry) if entry

  _onSourceMove: ( sourceId ) ->
    entry = @_bySourceId[sourceId]
    @_move(entry) if entry
