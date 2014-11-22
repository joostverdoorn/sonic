class AbstractList extends Observable

  Iterator: Iterator

  constructor: ( ) ->
    super()

    @_byId = {}
    @_next = {}
    @_previous = {}

    @_headSignal = @_create null
    @_tailSignal = @_create null

  _create: ( value ) ->
    signal = new Signal value
    @_add(signal)
    return signal

  _add: ( signal, options ) ->
    @_byId[signal.id] = signal
    @trigger('add', signal.id)

    @_move(signal, options)
    return true

  _delete: ( signal ) ->
    id = signal.id
    @_move(signal)

    delete @_byId[id]
    delete @_next[id]
    delete @_previous[id]

    @trigger('delete', id)
    return true

  _remove: ( signal ) ->
    id = signal.id
    @_previous[@_next[id].id] = @_previous[id] if @_next[id]
    @_next[@_previous[id].id] = @_next[id] if @_previous[id]
    return true

  _move: ( signal, options = {} ) ->
    @_remove(signal)

    id = signal.id
    previous = options.after or (@_previous[options.before.id] if options.before)
    next = options.before or (@_next[options.after.id] if options.after)

    # Attach
    @_previous[id] = previous
    @_next[id] = next

    @_next[previous.id] = signal if previous
    @_previous[next.id] = signal if next

    @trigger('move', signal, previous, next)
    return true

  _moveBefore: ( signal, other ) ->
    return @_move(signal, before: other)

  _moveAfter: ( signal, other ) ->
    return @_move(signal, after: other)

  _insert: ( value, options ) ->
    signal = @_create(value)
    @_move(signal, options)
    return signal

  _insertBefore: ( value, other = @_tailSignal ) ->
    @_insert value, before: other

  _insertAfter: ( value, other = @_headSignal) ->
    @_insert value, after: other

  # Iterator methods.
  getIterator: ( start ) ->
    start ||= @_headSignal
    return new @Iterator(@, start)

  before: ( signal ) ->
    return @_previous[signal?.id] unless signal is @_headSignal

  after: ( signal ) ->
    return @_next[signal?.id] unless signal is @_tailSignal

  # Public access methods.
  getSignal: ( id ) ->
    return @_byId[id]

  get: ( id ) ->
    return @getSignal(id)?.value()

  signalAt: ( index ) ->
    i = -1
    iterator = @getIterator()

    while iterator.moveNext()
      return iterator.signal if ++i is index
    return undefined

  idAt: ( index ) ->
    if signal = @signalAt(index)
      return signal.id
    return undefined

  at: ( index ) ->
    if signal = @signalAt(index)
      return signal.value()
    return undefined

  signalOf: ( value ) ->
    for id in Object.keys(@_byId)
      signal = @_byId[id]
      return signal if signal?.value() is value
    return undefined

  idOf: ( value ) ->
    return @signalOf(value)?.id

  indexOfSignal: ( signal, limit = Infinity ) ->
    i = -1
    iterator = @getIterator()

    while iterator.moveNext() and ++i < limit
      return i if iterator.signal is signal

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
    @eachSignal ( signal ) -> fn(signal.value())

  eachSignal: ( fn ) ->
    iterator = @getIterator()
    while iterator.moveNext()
      return false if fn(iterator.signal) is false
    return true

  any:  ( predicate ) ->
    return @some(predicate)

  some: ( predicate ) ->
    for index in [0 ... @length()]
      return true if predicate(@at(index))
    return false

  find: ( fn ) ->
    @findSignal ( signal ) -> fn(signal.value())

  findSignal: ( fn ) ->
    result = undefined

    @eachSignal ( signal ) ->
      if fn(signal)
        result = signal
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
    else return @getIterator(@headSignal).next().value

  skip: ( count ) -> @rest(count)
  tail: ( count ) -> @rest(count)
  drop: ( count ) -> @rest(count)
  rest: ( count ) ->

  initial: ( count ) ->



  last: ( count ) ->
    return @before(@_tailSignal).value() unless count

  pluck: ( key ) ->
    return @map ( value ) -> value[key]

  invoke: ( key, args... ) ->
    return @map ( value ) -> value[key](args...)

  toArray: ( ) ->
    values = []
    @each ( value ) -> values.push(value)
    return values

  # # Event handling
  # _onSignalEvent: ( event, signal, args... ) ->
  #   @trigger(event, signal.id, args...)
