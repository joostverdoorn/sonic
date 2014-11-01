class TakeList extends TailingList

  HeadEntry: -> new @Entry(null, list: @, source: @source.headEntry)
  TailEntry: -> new @Entry(null, list: @, source: @source.entryAt(@count))

  constructor: ( source, options = {} ) ->
    @count = options.count
    super(source, options)

  _create: ( sourceEntry, options = {} ) ->
    if @source.indexOfEntry(sourceEntry, @count) > -1
      return super(sourceEntry, options)
    return null

  # _onSourceMove: ( sourceId ) ->
  #   if sourceId is @tailEntry.source.id
  #     @tailEntry.source = @source.entryAt(@count)

  #   if entry = @_bySourceId[sourceId]

  #     if @source.indexOfEntry(sourceEntry, @count) > -1

