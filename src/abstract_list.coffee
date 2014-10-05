class AbstractList

  Entry: Entry

  # Add event bindings
  for key, fn of Events
    @::[key] = fn

  constructor: ( ) ->
    @_byId = {}

    @headEntry = new @Entry null, list: @
    @tailEntry = new @Entry null, list: @

    @length = 0

  _create: ( value, options = {} ) ->
    id = Sonic.uniqueId()

    entryOptions = options.entryOptions or {}
    entryOptions.id = id
    entryOptions.list = @

    entry = new @Entry value, entryOptions

    @_byId[id] = entry
    @length++

    @trigger('create', entry) unless options.silent
    return entry

  _delete: ( entry, options = {} ) ->
    return false unless entry?
    @_move(entry, before: null, after: null, silent: true)
    delete @_byId[entry.id]
    @length--

    @trigger('delete', entry) unless options.silent
    return true

  getEntry: ( id ) ->
    return @_byId[id]

  _set: ( entry, value, options = {} ) ->
    entry.setValue(value)
    @trigger('change', entry, value) unless options.silent
    return true

  _move: ( entry, options = {} ) ->
    previous = entry.previous()
    next = entry.next()

    previous.setNext(next) if previous
    next.setPrevious(previous) if next

    previous = options.after or (options.before.previous() if options.before)
    next = options.before or (options.after.next() if options.after)

    if previous
      entry.setPrevious(previous)
      previous.setNext(entry)

    if next
      entry.setNext(next)
      next.setPrevious(entry)

    @trigger('move', entry) unless options.silent
    return true

  _swap: ( a, b ) ->
    beforeA = a.previous()
    beforeB = b.previous()

    afterA = a.next()
    afterB = b.next()

    if beforeA isnt b or afterB isnt a
      return @_move(a, before: afterB) and @_move(b, after: beforeA)
    else return @_move(a, after: beforeB) and @_move(b, before: afterA)

  _insert: ( value, options = {} ) ->
    silent = options.silent
    before = options.before
    after = options.after

    entry = @_create(value, silent: silent)
    @_move(entry, before: before, after: after, silent: silent)

    return entry

  _entryOf: ( value ) ->
    for id in Object.keys(@_byId)
      entry = @_byId[id]
      return entry if entry?.value() is value
    return undefined

  _entryAt: ( index ) ->
    i = -1
    iterator = @getIterator()

    while iterator.moveNext()
      return iterator.current if ++i is index

    return undefined

  # Iterator methods.
  getIterator: ( start ) ->
    return new Iterator(@, start or @headEntry)

  # _before: ( entry ) ->
  #   before = entry.previous()
  #   return before unless before is @headEntry
  #   return undefined

  # _after: ( entry ) ->
  #   after = entry.next()
  #   return after unless after is @tailEntry
  #   return undefined

  # Public access methods.
  get: ( id ) ->
    entry = @getEntry(id)
    return entry.value() if entry
    return undefined

  set: ( id, value, options = {} ) ->
    entry = @getEntry(id)
    return false unless entry
    return @_set(entry, value, options)

  at: ( index ) ->
    entry = @_entryAt(index)
    return @get(id)

  before: ( value ) ->
    entry = @_entryOf(value)
    previous = entry.previous()

    return previous.value() unless previous is @headEntry
    return undefined

  after: ( value ) ->
    entry = @_entryOf(value)
    next = entry.next()

    return next.value() unless next is @tailEntry
    return undefined

  idOf: ( value ) ->
    return @_entryOf(value)?.id

  indexOf: ( value ) ->
    i = -1
    iterator = @getIterator()

    while iterator.moveNext()
      i++
      return i if iterator.current() is value

    return -1

  contains: ( value ) ->
    return @idOf(value)?

  # Moar stuff.
  forEach: ( fn ) -> @each(fn)
  each:    ( fn ) ->
    iterator = @getIterator()

    while iterator.moveNext()
      return if fn(iterator.current()) is false or iterator.entry.next() is @tailEntry

  any:  ( predicate ) -> @some(predicate)
  some: ( predicate ) ->
    for index in [0 ... @length()]
      return true if predicate(@at(index))
    return false


  map: ( mapFn ) ->
    return new MappedList @, mapFn: mapFn

  filter: ( filterFn ) ->
    return new FilteredList(@, filterFn: filterFn)

  sort: ( sortFn ) ->
    return new SortedList(@, sortFn)

  concat: ( others... ) ->
    return new ConcatenatedList([@].concat(others))

  flatten: ( ) ->
    return new ConcatenatedList(@)

  unique: ( ) -> @uniq()
  uniq:   ( ) ->
    return new UniqueList(@)

  union: ( others... ) ->
    return @concat(others...).uniq()

  first: ( count ) ->
    return @headEntry.next().value() unless count

  skip: ( count ) -> @rest(count)
  tail: ( count ) -> @rest(count)
  drop: ( count ) -> @rest(count)
  rest: ( count ) ->

  initial: ( count ) ->

  last: ( count ) ->
    return @tailEntry.previous().value() unless count

  pluck: ( key ) ->
    return @map ( value ) -> value[key]

  toArray: ( ) ->
    values = []
    @each ( value ) -> values.push value
    return values


