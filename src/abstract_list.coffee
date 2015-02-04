# Abstract list implements the basic list Sonic uses. As the name implies
# it serves mainly as a base class for other lists and is not very useful
# on its own.
#
# Abstract list implements a linked list backed by an index object for
# direct access. Values are stored in signals, which serve as a way to
# track values over time.
#
class AbstractList

  _sentinel:
    id: Sonic.uniqueId()

  constructor: ( ) ->
    @_byId = {}
    @_next = {}
    @_prev = {}

    @events = new Signal

  # Adds a signal.
  #
  # @param [Signal] signal The signal to add
  # @param [Object] options The options
  # @option options [Boolean] silent Whether or not to trigger an event
  # @option options [Signal] before The signal after which to place it
  # @option options [Signal] after The signal before which to place it
  #
  _add: ( signal, options ) ->
    @_byId[signal.id] = signal

    # @events.yield(
    #   type: 'add'
    #   id: signal.id
    #   signal: signal
    #   list: @
    # ) unless options?.silent

    if options and (options.before or options.after)
      @_move(signal, options)

    return true

  # Constructs and adds a new signal with the given value as value.
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

  # Sets the value of a signal
  #
  # @param [Signal] signal the singal to set the value of
  # @param [Any] value The value to set
  #
  _set: ( signal, value ) ->
    signal.yield(value)
    return true

  # Deletes a signal.
  #
  # @param [Signal] signal The signal to delete
  # @param [Object] options The options
  # @option options [Boolean] silent Whether or not to trigger a `delete` event
  #
  _delete: ( signal, options ) ->
    id = signal?.id
    return false unless id or @_byId[id]

    @_remove(signal)

    delete @_byId[id]
    delete @_next[id]
    delete @_prev[id]

    # @events.yield(
    #   type: 'invalidate'
    #   from: prev
    #   to:   next
    #   list: @
    # ) unless options?.silent

    return true

  _splice: ( after, before ) ->
    if signal = @after(after)
      while signal and signal isnt before
        next = @after(signal, 0)
        @_delete(signal, silent: true)
        signal = next

    if signal = @before(before)
      while signal and signal isnt after
        prev = @before(signal, 0)
        @_delete(signal, silent: true)
        signal = prev



    # if signal = before
    #   while signal = @before(signal, 0) and signal isnt after
    #     @_delete(signal, silent: true)

    @events.yield(
      type: 'invalidate'
      after:  after
      before: before
      list: @
    ) unless options?.silent

  # Removes a signal from the linked list. This does not delete it
  # from the index. This is simply a convenience method that calls
  # move without a position, which will then remove the signal.
  #
  # @param [Signal] signal The signal to remove
  # @param [Object] options The options
  # @option options [Boolean] silent Wether or not to trigger a `remove` event
  #
  _remove: ( signal, options ) ->
    id = signal?.id
    return false unless id or @_byId[id]

    return @_move(signal, options)

  # Moves the signal before or after the signal passed in the options.
  # When no position is given, the signal is removed from the list. When
  # either one is passed, this signal is moved between the given signal
  # and its sibling.
  #
  # @param [Signal] signal The signal to move
  # @param [Object] options The options
  # @option options [Signal] before The signal to move before
  # @option options [Signal] after The signal to move after
  #
  _move: ( signal, options ) ->
    id = signal.id

    prev = @_prev[id]
    next = @_next[id]

    @_prev[next.id] = prev if next
    @_next[prev.id] = next if prev

    if options and (options.before or options.after)
      prev = options.after  or (@_prev[options.before.id] if options.before)
      next = options.before or (@_next[options.after.id]  if options.after)

      @_prev[id] = prev
      @_next[id] = next

      @_next[prev.id] = signal if prev
      @_prev[next.id] = signal if next

    @events.yield(
      type: 'invalidate'
      from: signal
      to:   signal
      list: @
    ) unless options?.silent

    return true

  # Returns a new iterator. When no start is given, the iterator start
  # add the start (and simultanously the end) of the list.
  getIterator: ( start  ) ->
    return new Iterator(@, start)

  before: ( signal = @_sentinel ) ->
    prev = @_prev[signal.id]
    if prev is @_sentinel
      return null
    return prev

  after: ( signal = @_sentinel ) ->
    next = @_next[signal.id]
    if next is @_sentinel
      return null
    return next

  get: ( id ) ->
    return @_byId[id]?.value()


  #####
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
    iterator = @getIterator()

    while iterator.moveNext()
      return iterator.signal if iterator.signal.value() is value
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
    index = -1
    iterator = @getIterator()

    while iterator.moveNext() and ++index < limit
      return index if iterator.current() is value

    return -1

  contains: ( value, limit = Infinity ) ->
    return @indexOf(value, limit) isnt -1

  forEach: ( fn ) ->
    return @each(fn)

  each: ( fn ) ->
    iterator = @getIterator()
    while iterator.moveNext()
      return false if fn(iterator.current()) is false
    return true

  any:  ( predicate ) ->
    return @some(predicate)

  some: ( predicate ) ->
    for index in [0 ... @length()]
      return true if predicate(@at(index))
    return false

  find: ( fn ) ->
    result = undefined

    @each ( value ) ->
      if fn(value)
        result = value
        return false

    return result

  findSignal: ( fn, start = @after(@_sentinel), reverse = false ) ->
    result = undefined

    iterator = @getIterator(start)
    move = if reverse then iterator.movePrevious else iterator.moveNext
    return (iterator.signal while move.call(iterator) and not fn(iterator.signal))

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

  duplicates: () ->
    iterated = []
    duplicates = []
    iterator = @getIterator()
    while iterator.moveNext()
      value = iterator.current()
      if value in iterated
        duplicates.push(value)
      else iterated.push(value)

    return Sonic.create duplicates

  union: ( others... ) ->
    return @concat(others...).uniq()

  intersection: ( other ) ->
    return @filter(other.contains)

  take: ( count ) ->
    return new TakeList(@, count)

  first: ( count ) ->
    if count
      return @take(count)
    else return @getIterator(@_sentinel).next().value

  skip: ( count ) -> @rest(count)
  tail: ( count ) -> @rest(count)
  drop: ( count ) -> @rest(count)
  rest: ( count ) ->

  initial: ( count ) ->

  last: ( count ) ->
    return @before(@_sentinel).value() unless count

  pluck: ( key ) ->
    return @map ( value ) -> value[key]

  invoke: ( key, args... ) ->
    return @map ( value ) -> value[key](args...)

  toArray: ( ) ->
    values = []
    @each ( value ) -> values.push(value)
    return values

  _onSignalUpdate: ( value, signal ) =>
    @events.yield
      type: 'update'
      id: signal.id
      signal: signal
      list: @
