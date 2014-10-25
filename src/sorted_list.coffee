class SortedList extends TailingList

  Entry:    SortedEntry
  Iterator: SortedIterator

  HeadEntry: -> new @Entry(null, list: @, source: @source.headEntry, sortValue: -Infinity)
  TailEntry: -> new @Entry(null, list: @, source: @source.tailEntry, sortValue:  Infinity)

  constructor: ( source, options = {} ) ->
    @sortFn = options.sortFn
    @_evaluated = false

    super(source, options)

    @headEntry.insert(@tailEntry)
    @evaluate()

  evaluate: ( ) ->
    return false if @_evaluated

    iterator = @source.getIterator()

    while iterator.moveNext()
      sourceEntry = iterator.entry

      unless @_bySourceId[sourceEntry.id]
        @_insert(sourceEntry, silent: true)

    return @_evaluated = true

  _move: ( entry, options = {} ) ->
    @_remove(entry, silent: true)
    @headEntry.insert(entry)

    @trigger('move', entry.id) unless options.silent
    return true

  _set: ( entry, value, options = {} ) ->
    super(entry, value, options)
    @_move(entry, silent: options.silent)

    return true

