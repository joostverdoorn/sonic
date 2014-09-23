class LinkedList extends AbtractList

  # Add event bindings
  for key, fn of Events
    @::[key] = fn

  constructor: ( ) ->
    @_uniqueCounter = 0;

    @_byId = {}

    @_before = {}
    @_after  = {}

    @headEntry = @_uniqueId()
    @tailEntry = @_uniqueId()

    @length = 0

  _uniqueId: ( ) ->
    return (++@_uniqueCounter).toString()

  getIterator: ( start = @headEntry ) ->
    return new Iterator(@, start)

  _create: ( item, options = {} ) ->
    id = @uniqueId()
    @_byId[id] = item
    @length++

    @trigger 'create', id unless options.silent
    return id

  _delete: ( id, options = {} ) ->
    return false unless @_byId[id]?

    @move id, before: null, after: null
    delete @_byId[id]
    @length--

    @trigger 'delete', id unless options.silent
    return true

  get: ( id ) ->
    return @_byId[id]

  set: ( id, value, options = {} ) ->
    unless @_byId[id]?
      return false

    @_byId[id] = value
    @trigger 'change', id, value
    return true

  _move: ( id, options = {} ) ->
    # Before moving the element, we make sure to leave no loose ends behind.
    # We connect the elements previously preceding and following the movee.
    before = @_before[id]
    after  = @_after[id]
    @_before[after] = before if after?
    @_after[before] = after if before?

    # Now that we've closed the gap, let's start moving the id into the correct
    # position.
    after = options.before or (@_after[options.after] if options.before is undefined)
    before = options.after or (@_before[options.before] if options.after is undefined)

    # Make sure no non-existent IDs are having their befores and afters set.
    unless (not before? or @_byId[before]? or before is @headEntry) and
           (not after?  or @_byId[after]?  or after  is @tailEntry)
      return false

    # Finally, set all the ids.
    @_after[id] = after
    @_before[after] = id if after?

    @_before[id] = before
    @_after[before] = id if before?

    @trigger 'move', id unless options.silent
    return true

  remove: ( item ) ->
    id = @idOf(item)
    return @delete id

  _insert: ( item, options = {} ) ->
    { before, after, silent } = options

    id = @create item, { silent }
    @move id, { before, after, silent }

    return id

  _idAt: ( index ) ->
    i = -1
    iterator = @getIterator()

    while iterator.moveNext()
      return iterator.current if ++i is index

    return undefined

  at: ( index ) ->
    id = @idAt(index)
    return @get(id)

  _idOf: ( item ) ->
    ids = Object.keys(@_byId)
    for id in ids
      return id if @get(id) is item

    return undefined

  indexOf: ( item ) ->
    i = -1
    iterator = @getIterator()

    while iterator.moveNext()
      i++
      return i if iterator.current() is item

    return -1

  before: ( id ) ->
    beforeId = @_before[id]
    return beforeId unless beforeId is @headEntry

  after: ( id ) ->
    afterId = @_after[id]
    return afterId unless afterId is @tailEntry

  contains: ( item ) ->
    return @idOf(item)?

  forEach: ( fn ) -> @each(fn)
  each:    ( fn ) ->
    iterator = @getIterator()

    while iterator.moveNext()
      return if fn(iterator.current()) is false

  any:  ( predicate ) -> @some(predicate)
  some: ( predicate ) ->
    for index in [0 ... @length()]
      return true if predicate(@at(index))
    return false


  map: ( mapFn ) ->
    return new MappedList(@, mapFn)

  filter: ( filterFn ) ->
    return new FilteredList(@, filterFn)

  sort: ( sortFn ) ->
    return new SortedList(@, sortFn)

  concat: ( others... ) ->
    return new ConcatenatedList([@].concat(others))

  unique: ( ) -> @uniq()
  uniq:   ( ) ->
    return new UniqueList(@)

  union: ( others... ) ->
    return @concat(others...).uniq()

  first: ( count ) ->
    return @get(@after(@headEntry)) unless count

  skip: ( count ) -> @rest(count)
  tail: ( count ) -> @rest(count)
  drop: ( count ) -> @rest(count)
  rest: ( count ) ->

  initial: ( count ) ->

  last: ( count ) ->
    return @get(@before(@tailEntry)) unless count

  pluck: ( key ) ->
    return @map ( item ) -> item[key]

  toArray: ( ) ->
    items = []
    @each ( item ) -> items.push item
    return items


