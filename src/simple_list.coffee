class SimpleList extends AbstractList

  constructor: ( values ) ->
    super

    previous = @headEntry

    if values?
      for value in values
        id = @_uniqueId()
        entry = @_create(value, silent: true)

        previous.setNext(entry)
        entry.setPrevious(previous)

        previous = entry
      length = values.length

    previous.setNext(@tailEntry)
    @tailEntry.setPrevious(previous)

  push: ( value, options = {} ) ->
    options.before = @tailEntry
    return @_insert(value, options).id

  unshift: ( value, options = {}) ->
    options.after = @headEntry
    return @_insert(value, options).id

  pop: ( options ) ->
    entry = @before @tailEntry
    @_delete entry, options
    return entry.value()

  shift: ( options ) ->
    entry = @after @headEntry
    @_delete entry, options
    return entry.value()

  add:  ( value, options ) ->
    return @push(value, options)

  remove: ( value, options ) ->
    entry = @_entryOf(value)
    return @_delete(entry, options)

  delete: ( id, options ) ->
    entry = @getEntry(id)
    return @_delete(entry, options)

