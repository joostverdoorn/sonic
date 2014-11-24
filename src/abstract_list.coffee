class AbstractList

  Iterator: Iterator

  constructor: ( ) ->
    @_byId = {}
    @_next = {}
    @_previous = {}

    @_headSignal = { id: Sonic.uniqueId() }
    @_tailSignal = { id: Sonic.uniqueId() }

    @_byId[@_headSignal.id] = @_headSignal
    @_byId[@_tailSignal.id] = @_tailSignal

    @events = new Signal null

  _onSignalUpdate: ( value, signal ) =>
    return false unless @_byId[signal.id]
    @events.yield
      type: 'update'
      object: @
      key: signal.id
      value: signal

  # Constructs and adds a new signal.
  #
  # @param [Object] value Any value
  # @param [Object] options The options
  # @option options [Boolean] silent Whether or not to trigger an event
  # @option options [Signal] before The signal after which to place it
  # @option options [Signal] after The signal before which to place it
  #
  _create: ( value, options ) ->
    signal = new Signal(value)
    signal.forEach(@_onSignalUpdate)

    @_add(signal, options)
    return signal

  # Constructs and adds a new signal before the given signal.
  # If no signal is given, the new signal is appended to the list.
  #
  # @param [Object] value Any value
  # @param [Signal] other The signal before which to place it
  # @param [Object] options The options
  # @option options [Boolean] silent Wether or not to trigger an event
  #
  _createBefore: ( value, other = @_tailSignal, options = {} ) ->
    options.before = other
    return @_create(value, options)

  # Constructs and adds a new signal after the given signal.
  # If no signal is given, the new signal is prepended to the list.
  #
  # @param [Object] value Any value
  # @param [Signal] other The signal before which to place it
  # @param [Object] options The options
  # @option options [Boolean] silent Wether or not to trigger an event
  #
  _createAfter: ( value, other = @_headSignal, options = {} ) ->
    options.after = other
    return @_create(value, options)

  # Adds a signal
  #
  # @param [Signal] signal The signal to add
  # @param [Object] options The options
  # @option options [Boolean] silent Whether or not to trigger an event
  # @option options [Signal] before The signal after which to place it
  # @option options [Signal] after The signal before which to place it
  #
  _add: ( signal, options ) ->
    unless @_byId[signal.id]
      @_byId[signal.id] = signal

    unless options?.silent
      @events.yield
        type: 'add'
        object: @
        key: signal.id
        value: signal

    if options and (options.before or options.after)
      @_move(signal, options)

    return true

  # Adds a signal before the given signal.
  # If no signal is given, the new signal is appended to the list.
  #
  # @param [Signal] signal The signal to add
  # @param [Signal] other The signal before which to place it
  # @param [Object] options The options
  # @option options [Boolean] silent Wether or not to trigger an event
  #
  _addBefore: ( signal, other = @_tailSignal, options = {} ) ->
    options.before = other
    return @_add(signal, options)

  # Adds a signal after the given signal.
  # If no signal is given, the new signal is prepended to the list.
  #
  # @param [Signal] signal The signal to add
  # @param [Signal] other The signal after which to place it
  # @param [Object] options The options
  # @option options [Boolean] silent Wether or not to trigger an event
  #
  _addAfter: ( signal, other = @_headSignal, options = {} ) ->
    options.after = other
    return @_add(signal, options)

  # Deletes a Signal
  #
  # @param [Signal] signal The signal to delete
  # @param [Object] options The options
  # @option options [Boolean] silent Whether or not to trigger an event
  #
  _delete: ( signal, options ) ->
    @_remove(signal)

    id = signal.id
    delete @_byId[id]
    delete @_next[id]
    delete @_previous[id]

    @events.yield(
      type: 'delete'
      object: @
      key: signal.id
      value: signal
    ) unless options?.silent

    return true

  _remove: ( signal ) ->
    return @_move(signal)

  _move: ( signal, options ) ->
    id = signal.id

    @_previous[@_next[id].id] = @_previous[id] if @_next[id]
    @_next[@_previous[id].id] = @_next[id] if @_previous[id]

    if options and (options.before or options.after)
      previous = options.after or (@_previous[options.before.id] if options.before)
      next = options.before or (@_next[options.after.id] if options.after)

      @_previous[id] = previous
      @_next[id]     = next

      @_next[previous.id] = signal if previous
      @_previous[next.id] = signal if next

    @events.yield(
      type: 'move'
      object: @
      key: signal.id
      value: signal
    ) unless options?.silent

    return true

  _moveBefore: ( signal, other ) ->
    return @_move(signal, before: other)

  _moveAfter: ( signal, other ) ->
    return @_move(signal, after: other)




  # _set: ( signal, value ) ->

  # _insert: ( signal, options ) ->
  #   signal = @_add(signal, options)
  #   move
  #   return signal

  # _insertBefore: ( value, other = @_tailSignal ) ->
  #   @_insert value, before: other

  # _insertAfter: ( value, other = @_headSignal) ->
  #   @_insert value, after: other

  # Iterator methods.
  getIterator: ( start ) ->
    start ||= @_headSignal
    return new @Iterator(@, start)

  before: ( signal ) ->
    previous = @_previous[signal?.id or @_tailSignal.id]
    if previous is @_headSignal
      return null
    return previous

  after: ( signal ) ->
    next = @_next[signal?.id or @_headSignal.id]
    if next is @_tailSignal
      return null
    return next

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
      continue if signal is @_headSignal or signal is @_tailSignal
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

  transform: ( options ) ->
    return new TransformedList(@, options)

  map: ( mapFn ) ->
    return @transform(mapFn: mapFn)

  filter: ( filterFn ) ->
    return @transform(filterFn: filterFn)

  sort: ( sortFn ) ->
    return new SortedList(@, sortFn)

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
    return new TakeList(@, count)

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

