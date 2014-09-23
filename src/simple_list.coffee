class SimpleList extends AbstractList

  constructor: ( items ) ->
    super

    previous = @headEntry

    if items?
      for item in items
        id = @_uniqueId()
        entry = @_create(item, silent: true)

        previous.next = entry
        entry.previous = previous

        previous = entry
      length = items.length

    previous.next = @tailEntry
    @tailEntry.previous = previous

  push: ( item, options = {} ) ->
    options.before = @tailEntry
    return @_insert(item, options)

  unshift: ( item, options = {}) ->
    options.after = @headEntry
    return @_insert(item, options)

  pop: ( options ) ->
    entry = @before @tailEntry
    @_delete entry, options
    return entry.item

  shift: ( options ) ->
    entry = @after @headEntry
    @_delete entry, options
    return entry.item

  add:  ( item, options ) ->
    return @push(item, options)

  remove: ( item, options ) ->
    entry = @_entryOf(item)
    return @_delete(entry, options)

  delete: ( id, options ) ->
    entry = @getEntry(id)
    return @_delete(entry, options)

