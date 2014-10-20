class SimpleList extends AbstractList

  constructor: ( values ) ->
    super

    previous = @headEntry

    if values?
      for value in values
        entry = @_create(value, silent: true)

        previous.next = entry
        entry.previous = previous

        previous = entry
      length = values.length

    previous.next = @tailEntry
    @tailEntry.previous = previous

  set: ( id, value, options = {} ) ->
    entry = @getEntry(id)
    return false unless entry
    return @_set(entry, value, options)

  push: ( value, options = {} ) ->
    options.before = @tailEntry
    return @_insert(value, options).id

  unshift: ( value, options = {}) ->
    options.after = @headEntry
    return @_insert(value, options).id

  pop: ( options ) ->
    entry = @tailEntry.previous
    @_delete(entry, options)
    return entry.value()

  shift: ( options ) ->
    entry = @headEntry.next
    @_delete(entry, options)
    return entry.value()

  add:  ( value, options ) ->
    return @push(value, options)

  remove: ( value, options ) ->
    entry = @entryOf(value)
    return @_delete(entry, options)

  delete: ( id, options ) ->
    entry = @getEntry(id)
    return @_delete(entry, options)

