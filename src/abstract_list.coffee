Signal = require('./signal')

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

  _splice: ( prev, next, first, last = first ) ->
    return false unless ((prev is 0 or @has(prev)) or (next is 0 or @has(next))) and
                        (not first or @has(first)) and (not last or first is last or @has(last))

    _next = @_next[prev]
    while (id = _next) and id isnt next
      _next = @_next[id]
      delete @_byId[id]
      delete @_prev[id]
      delete @_next[id]

    _prev = @_prev[next]
    while (id = _prev) and id isnt prev
      _prev = @_prev[id]
      delete @_byId[id]
      delete @_prev[id]
      delete @_next[id]

    if first?
      oldPrev = @_prev[first]
      @_prev[first] = prev

    if last?
      oldNext = @_next[last]
      @_next[last] = next

    @_next[oldPrev] = oldNext if oldPrev is 0 or @has(oldPrev)
    @_prev[oldNext] = oldPrev if oldNext is 0 or @has(oldNext)

    @_prev[next] = last if next?
    @_next[prev] = first if prev?

    @_invalidate(prev, next)
    return true

  # Adds a value.
  #
  # @param [any] value The value to add
  # @param [number] prev The id of the previous entry
  # @param [number] next The id of the next entry
  # @return [number] the id of the added value
  #
  _add: ( value, prev, next ) ->
    id = Sonic.uniqueId()
    @_byId[id] = value

    unless @_move(id, prev, next)
      delete @_byId[id]
      return null

    return id


  # Sets the value of an entry.
  #
  # @param [number] id The id of the entry to set the value of
  # @param [any] value The value to set
  # @param [object] options The options
  # @option options [boolean] silent Whether or not to throw an invalidate
  # @return [boolean] Wether or not the entry could be set
  #
  _set: ( id, value ) ->
    return false unless @has(id)

    @_byId[id] = value
    @_invalidate(@_prev[id], @_next[id])

    return true

  # Deletes an entry.
  #
  # @param [number] id The id of the entry to delete
  # @param [object] options The options
  # @option options [boolean] silent Whether or not to throw an invalidate
  # @return [boolean] Whether or not the entry was deleted
  #
  _delete: ( id ) ->
    return id isnt 0 and @_splice(@_prev[id], @_next[id], @_next[id], @_prev[id])

  # Removes the entry and moves it between the given entries.
  #
  # @param [number] id The id of the entry to move
  # @param [object] options The options
  # @option options [number] prev The id of the entry after which to insert the value
  # @option options [number] next The id of the entry before which to insert the value
  # @option options [boolean] silent Whether or not to throw an invalidate
  # @return [boolean] Whether or not the entry was moved
  #
  _move: ( id, prev, next ) ->
    prev = @_prev[next] if next? and not prev?
    next = @_next[prev] if prev? and not next?
    return @_splice(prev, next, id)

  #
  #
  get: ( id ) ->
    return @_byId[id]

  has: ( id ) ->
    return id of @_byId

  prev: ( id = 0 ) ->
    return @_prev[id] or null

  next: ( id = 0 ) ->
    return @_next[id] or null

  onInvalidate: ( callback ) ->
    @_events.forEach(callback)

  # Yields an invalidate event
  #
  _invalidate: ( prev, next ) ->
    event = { prev, next }
    @_events.yield(event)

module.exports = AbstractList

