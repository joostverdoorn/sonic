class TailingList extends AbstractList

  Entry: TailingEntry
  Iterator: TailingIterator

  HeadEntry: -> @_create(@source.headEntry, silent: true)
  TailEntry: -> @_create(@source.tailEntry, silent: true)

  constructor: ( source, options = {} ) ->
    @source = source
    @_bySourceId = {}

    @source.on 'create', @_onSourceCreate, @
    @source.on 'delete', @_onSourceDelete, @
    @source.on 'update', @_onSourceUpdate, @
    @source.on 'move',   @_onSourceMove,   @

    super options

  getBySource: ( sourceEntry ) ->
    if entry = @_bySourceId[sourceEntry.id]
      return entry

    entry = @_create(sourceEntry, silent: true)
    return entry

  _create: ( sourceEntry, options = {} ) ->
    entry = super(sourceEntry, options)
    @_bySourceId[sourceEntry.id] = entry
    return entry

  _delete: ( entry, options = {} ) ->
    delete @_bySourceId[entry.source.id]
    super(entry, options)

  _move: ( entry, options = {} ) ->
    iterator = @getIterator(entry)
    previous = iterator.previous().entry
    next = iterator.reset().next().entry

    super(entry, before: next, after: previous, silent: options.silent)

  _onSourceCreate: ( sourceId ) ->
    sourceEntry = @source.getEntry(sourceId)
    @_create(sourceEntry)

  _onSourceDelete: ( sourceId ) ->
    entry = @_bySourceId[sourceId]
    @_delete(entry) if entry

  _onSourceUpdate: ( sourceId, value ) ->
    entry = @_bySourceId[sourceId]
    @_reset(entry) if entry

  _onSourceMove: ( sourceId ) ->
    entry = @_bySourceId[sourceId]
    @_move(entry) if entry
