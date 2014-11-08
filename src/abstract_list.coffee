class AbstractList extends Observable

  Entry:    Entry
  Iterator: Iterator

  HeadEntry: -> new @Entry(null, list: @)
  TailEntry: -> new @Entry(null, list: @)

  constructor: ( ) ->
    super()

    @_byId = {}

    @headEntry = @HeadEntry()
    @tailEntry = @TailEntry()

  _create: ( value, options = {} ) ->
    options.list = @

    entry = new @Entry(value, options)
    # entry.on('*', @_onEntryEvent, @)

    id = entry.id
    @_byId[id] = entry

    # @trigger('create', entry.id) unless options.silent
    return entry

  _delete: ( entry, options = {} ) ->
    entry.remove()
    # entry.off('*', @_onEntryEvent, @)

    delete @_byId[entry.id]

    # @trigger('delete', entry.id) unless options.silent
    return true

  _move: ( entry, options = {} ) ->
    entry.remove()

    previous = options.after or (options.before.previous if options.before)
    next = options.before or (options.after.next if options.after)

    entry.attachNext(next)
    entry.attachPrevious(previous)

    # @trigger('move', entry.id) unless options.silent
    return true

  _insert: ( value, options = {} ) ->
    entry = @_create(value, silent: options.silent)
    @_move(entry, options) if entry

    return entry

  _remove: ( entry, options = {} ) ->
    entry.remove()

    # @trigger('move', entry.id) unless options.silent
    return true

  # Iterator methods.
  getIterator: ( start ) ->
    start ||= @headEntry
    return new @Iterator(@, start)

  # Public access methods.
  getEntry: ( id ) ->
    return @_byId[id]

  get: ( id ) ->
    if entry = @getEntry(id)
      return entry.value()
    return undefined

  entryAt: ( index ) ->
    i = -1
    iterator = @getIterator()

    while iterator.moveNext()
      return iterator.entry if ++i is index
    return undefined

  idAt: ( index ) ->
    if entry = @entryAt(index)
      return entry.id
    return undefined

  at: ( index ) ->
    if entry = @entryAt(index)
      return entry.value()
    return undefined

  entryOf: ( value ) ->
    for id in Object.keys(@_byId)
      entry = @_byId[id]
      return entry if entry?.value() is value
    return undefined

  idOf: ( value ) ->
    return @entryOf(value)?.id

  indexOfEntry: ( entry, limit = Infinity ) ->
    i = -1
    iterator = @getIterator()

    while iterator.moveNext() and ++i < limit
      return i if iterator.entry is entry

    return -1

  indexOf: ( value, limit = Infinity ) ->
    i = -1
    iterator = @getIterator()

    while iterator.moveNext() and ++i < limit
      return i if iterator.current() is value

    return -1

  contains: ( value ) ->
    return @idOf(value)?

  forEach: ( fn ) ->
    return @each(fn)

  each:    ( fn ) ->
    @eachEntry ( entry ) -> fn(entry.value())

  eachEntry: ( fn ) ->
    iterator = @getIterator()
    while iterator.moveNext()
      return false if fn(iterator.entry) is false
    return true

  any:  ( predicate ) ->
    return @some(predicate)

  some: ( predicate ) ->
    for index in [0 ... @length()]
      return true if predicate(@at(index))
    return false

  find: ( fn ) ->
    @findEntry ( entry ) -> fn(entry.value())

  findEntry: ( fn ) ->
    result = undefined

    @eachEntry ( entry ) ->
      if fn(entry)
        result = entry
        return false

    return result

  reduce: ( reduceFn, memo = 0 ) ->
    @each ( value ) ->
      memo = reduceFn(value, memo)
    return memo

  map: ( mapFn ) ->
    return new MappedList(@, mapFn: mapFn)

  filter: ( filterFn ) ->
    return new FilteredList(@, filterFn: filterFn)

  sort: ( sortFn ) ->
    return new SortedList(@, sortFn: sortFn)

  concat: ( others... ) ->
    return new ConcatenatedList([@].concat(others))

  flatten: ( ) ->
    return new ConcatenatedList(@)

  reverse: ( ) ->
    return new ReversedList(@)

  unique: ( ) ->
    return @uniq()

  uniq:   ( ) ->
    return new UniqueList(@)

  union: ( others... ) ->
    return @concat(others...).uniq()

  take: ( count ) ->
    return new TakeList(@, count: count)

  first: ( count ) ->
    if count
      return @take(count)
    else return @getIterator(@headEntry).next().value

  skip: ( count ) -> @rest(count)
  tail: ( count ) -> @rest(count)
  drop: ( count ) -> @rest(count)
  rest: ( count ) ->

  initial: ( count ) ->



  last: ( count ) ->
    return @tailEntry.previous.value() unless count

  pluck: ( key ) ->
    return @map ( value ) -> value[key]

  invoke: ( key, args... ) ->
    return @map ( value ) -> value[key](args...)

  toArray: ( ) ->
    values = []
    @each ( value ) -> values.push(value)
    return values

  # # Event handling
  # _onEntryEvent: ( event, entry, args... ) ->
  #   @trigger(event, entry.id, args...)
