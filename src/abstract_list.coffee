`
import Signal      from './signal'
import Iterator    from './iterator'
`

# Abstract list implements the basic list Sonic uses. As the name implies
# it serves mainly as a base class for other lists and is not very useful
# on its own.
#
# Abstract list implements a linked list backed by an index object for
# direct access. Values are stored in signals, which serve as a way to
# track values over time.
#
class AbstractList

  constructor: ( ) ->
    @_byId = {}
    @_prev = {}
    @_next = {}

    @_events = new Signal

  # Adds a value.
  #
  # @param [any] value The value to add
  # @param [Object] options The options
  # @option options [number] prev The id of the entry after which to insert the value
  # @option options [number] next The id of the entry before which to insert the value
  #
  _add: ( value, options ) ->
    if options? and options.id?
      id = options.id
    else id = Sonic.uniqueId()

    @_byId[id] = value

    if options and (options.prev? or options.next?)
      @_move(id, options)

    return id

  # Sets the value of an entry.
  #
  # @param [number] id The id of the entry to set the value of
  # @param [any] value The value to set
  #
  _set: ( id, value, options ) ->
    return false unless id isnt 0 and @has(id)

    @_byId[id] = value
    @_invalidate(@_prev[id], @_next[id]) unless options?.silent

    return true

  # Deletes an entry.
  #
  # @param [number] id The id of the entry to delete
  #
  _delete: ( id, options ) ->
    return false unless id isnt 0 and @_remove(id, options)

    delete @_byId[id]
    delete @_next[id]
    delete @_prev[id]

    return true

  # Removes an entry from the linked list. This does not delete it
  # from the index.
  #
  # @param [number] id The id of the entry to remove
  #
  _remove: ( id, options ) ->
    return false unless @has(id)

    prev = @_prev[id]
    next = @_next[id]

    @_prev[next] = prev if prev?
    @_next[prev] = next if next?
    @_invalidate(prev, next) if next? or prev? and not options?.silent

    return true

  # Moves the signal before or after the entry passed in the options.
  #
  # @param [number] id The id of the entry to move
  # @param [Object] options The options
  # @option options [Signal] before The id of the entry to move before
  # @option options [Signal] after The id of the entry to move after
  #
  _move: ( id, options ) ->
    return false unless @has(id)

    @_remove(id)

    prev = options?.prev
    next = options?.next

    prev = @_prev[next] if next? and not prev?
    next = @_next[prev] if prev? and not next?

    if prev?
      @_prev[id] = prev
      @_next[prev] = id

    if next?
      @_next[id] = next
      @_prev[next] = id

    @_invalidate(prev, next) unless options?.silent

    return true

  _slice: ( prev, next ) ->
    @_delete(id, silent: true) while (id = @_next[id or prev]) and id isnt next if prev?
    @_delete(id, silent: true) while (id = @_prev[id or next]) and id isnt prev if next?
    @_invalidate(prev, next)

  #
  #
  get: ( id ) ->
    return @_byId[id]

  has: ( id ) ->
    return id of @_byId or id is 0

  prev: ( id = 0 ) ->
    return @_prev[id] or null

  next: ( id = 0 ) ->
    return @_next[id] or null

  onInvalidate: ( callback ) ->
    @_events.forEach(callback)

  #
  #
  getIterator: ( start ) ->
    return new Iterator(@, start)

  each: ( fn ) ->
    return @forEach(fn)

  forEach: ( fn ) ->
    iterator = @getIterator()
    while iterator.moveNext()
      return false if fn(iterator.current()) is false
    return true

  at: ( index ) ->
    if id = @idAt(index)
      return @get(id)
    return undefined

  idAt: ( index ) ->
    i = -1
    iterator = @getIterator()

    while iterator.moveNext()
      return iterator.currentId if ++i is index
    return undefined

  idOf: ( value ) ->
    iterator = @getIterator()

    while iterator.moveNext()
      return iterator.currentId if iterator.current() is value
    return undefined

  indexOf: ( value, limit = Infinity ) ->
    index = -1
    iterator = @getIterator()

    while iterator.moveNext() and ++index < limit
      return index if iterator.current() is value
    return -1

  contains: ( value, limit = Infinity ) ->
    return @indexOf(value, limit) isnt -1

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

  reduce: ( reduceFn, memo = 0 ) ->
    @each ( value ) ->
      memo = reduceFn(value, memo)
    return memo

  first: ( ) ->
    return @get(@next())

  last: ( count ) ->
    return @get(@prev())

  toArray: ( ) ->
    values = []
    @each ( value ) -> values.push(value)
    return values

  # Yields an invalidate event
  #
  _invalidate: ( prev, next ) ->
    event = { prev, next }
    @_events.yield(event)


`
export default AbstractList
`
