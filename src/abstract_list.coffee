class AbstractList

  # Add event bindings
  for key, fn of Events
    @::[key] = fn

  constructor: ( ) ->
    @_uniqueCounter = 0;

    @_byId = {}

    @_before = {}
    @_after  = {}

    @headId = @_uniqueId()
    @tailId = @_uniqueId()

    @length = 0

  _uniqueId: ( ) ->
    return (++@_uniqueCounter).toString()

  getIterator: ( start = @headId ) ->
    return new Iterator(@, start)

  create: ( item, options = {} ) ->
    id = @_uniqueId()
    @_byId[id] = item
    @length++

    @trigger('create', id) unless options.silent
    return id

  delete: ( id, options = {} ) ->
    return false unless @_byId[id]?

    @move(id, before: null, after: null)
    delete @_byId[id]
    @length--

    @trigger('delete', id) unless options.silent
    return true

  get: ( id ) ->
    return @_byId[id]

  set: ( id, value, options = {} ) ->
    unless @_byId[id]?
      return false

    @_byId[id] = value
    @trigger('change', id, value) unless options.silent
    return true

  move: ( id, options = {} ) ->
    return false unless @_byId[id]?

    # Before moving the element, we make sure to leave no loose ends behind.
    # We connect the elements previously preceding and following the movee.
    beforeId = @_before[id]
    afterId  = @_after[id]

    @_before[afterId] = beforeId if afterId
    @_after[beforeId] = afterId if beforeId

    # Now that we've closed the gap, let's start moving the id into the correct
    # position.
    afterId = options.before or @_after[options.after]
    beforeId = options.after or @_before[options.before]

    # Finally, set all the ids.
    if afterId
      @_after[id] = afterId
      @_before[afterId] = id

    if beforeId
      @_before[id] = beforeId
      @_after[beforeId] = id

    @trigger('move', id) unless options.silent
    return true

  swap: ( idA, idB ) ->
    return false unless @_byId[idA]? and @_byId[idB]?

    beforeIdA = @_before[idA]
    beforeIdB = @_before[idB]
    afterIdA = @_after[idA]
    afterIdB = @_after[idB]

    if beforeIdA isnt idB or afterIdB isnt idA
      return @move(idA, before: afterIdB) and @move(idB, after: beforeIdA)
    else
      return @move(idA, after: beforeIdB) and @move(idB, before: afterIdA)

  remove: ( item ) ->
    id = @idOf(item)
    return @delete(id)

  insert: ( item, options = {} ) ->
    { before, after, silent } = options

    id = @create item, { silent }
    @move id, { before, after, silent }

    return id

  idAt: ( index ) ->
    i = -1
    iterator = @getIterator()

    while iterator.moveNext()
      return iterator.current if ++i is index

    return undefined

  at: ( index ) ->
    id = @idAt(index)
    return @get(id)

  idOf: ( item ) ->
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
    return beforeId unless beforeId is @headId

  after: ( id ) ->
    afterId = @_after[id]
    return afterId unless afterId is @tailId

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
    return @get(@after(@headId)) unless count

  skip: ( count ) -> @rest(count)
  tail: ( count ) -> @rest(count)
  drop: ( count ) -> @rest(count)
  rest: ( count ) ->

  initial: ( count ) ->

  last: ( count ) ->
    return @get(@before(@tailId)) unless count

  pluck: ( key ) ->
    return @map ( item ) -> item[key]

  toArray: ( ) ->
    items = []
    @each ( item ) -> items.push item
    return items


