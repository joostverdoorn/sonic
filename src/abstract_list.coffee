Signal = require('./signal')

# AbstractList implements the basic list Sonic uses. As the name implies
# it serves mainly as a base class for other lists and is not very useful
# on its own.
#
# AbstractList implements a linked list backed by an index object for
# direct access.
#
class AbstractList

  constructor: ( ) ->
    @_byId = {}
    @_prev = {}
    @_next = {}

    @_events = new Signal

  # Returns the value at the specified id.
  #
  # @param [number] id The id of the requested value
  # @return [any] The value
  #
  get: ( id ) ->
    return @_byId[id]

  # Returns wether or this list contains the given id.
  #
  # @param [number] id The id to check
  # @return [boolean] Whether or not the list contains the given id
  #
  has: ( id ) ->
    return !!id and id of @_byId

  # Returns the id that precedes the given id.
  #
  # @param [number] id The id from which to find the previous
  # @return [number] The id that precedes the given id
  #
  prev: ( id = 0 ) ->
    return @_prev[id] or null

  # Returns the id that succeeds the given id.
  #
  # @param [number] id The id from which to find the next
  # @return [number] The id that succeeds the given id
  #
  next: ( id = 0 ) ->
    return @_next[id] or null

  # Adds a callback function that's called when the list invalidates.
  #
  # @param [Function] callback The callback to call when the list invalidates
  #
  onInvalidate: ( callback ) ->
    @_events.forEach(callback)

  # Splices the list between the given prev and next, removing
  # all entries between them. When a first and or last are
  # specified, will connect the prev to the first and last to
  # the next.
  #
  # @param [number] prev The id of the left end of the range to splice
  # @param [number] next The id of the right end of the range to splice
  # @param [number] first The id of the first entry to splice betwen prev and next
  # @param [number] last The id of the last entry to splice between prev and next
  # @return [boolean] Whether or not the splice was succesfull
  #
  _splice: ( prev, next, first, last = first ) ->
    return false unless (prev is 0 or @has(prev)) or (next is 0 or @has(next))

    # Walk forward over the list from the given prev and delete
    # all entries until the given next or no entry can be found
    while _next = @_next[_next or prev]
      delete @_next[@_prev[_next]]
      delete @_prev[_next]

      break if _next is next
      delete @_byId[_next]

    # Walk backward over the list from the given next and delete
    # all entries until the given prev or no entry can be found
    while _prev = @_prev[_prev or next]
      delete @_prev[@_next[_prev]]
      delete @_next[_prev]

      break if _prev is prev
      delete @_byId[_prev]

    # Connect the first to the prev
    if first? and prev?
      @_next[prev] = first
      @_prev[first] = prev

    # Connect the last to the next
    if last? and next?
      @_prev[next] = last
      @_next[last] = next

    # Invalidate the range
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
    return null unless @_move(id, prev, next)

    @_byId[id] = value
    return id

  # Sets the value of an entry.
  #
  # @param [number] id The id of the entry to set the value of
  # @param [any] value The value to set
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
  # @return [boolean] Whether or not the entry was deleted
  #
  _delete: ( id ) ->
    return id isnt 0 and @_splice(@_prev[id], @_next[id], @_next[id], @_prev[id])

  # Removes the entry and moves it between the given entries.
  #
  # @param [number] id The id of the entry to move
  # @param [object] options The options
  # @param [number] prev The id of the entry after which to insert the value
  # @param [number] next The id of the entry before which to insert the value
  # @return [boolean] Whether or not the entry was moved
  #
  _move: ( id, prev, next ) ->
    @_splice(oldPrev, id) if (oldPrev = @_prev[id])?
    @_splice(id, oldNext) if (oldNext = @_next[id])?
    @_splice(oldPrev, oldNext, oldNext, oldPrev)

    prev = @_prev[next] if next? and not prev?
    next = @_next[prev] if prev? and not next?
    return @_splice(prev, next, id)

  # Yields an invalidate event for the given range, calling
  # all handlers.
  #
  # @param [number] prev The id of the left end of the range to invalidate
  # @param [number] next The id of the right end of the range to invalidate
  #
  _invalidate: ( prev, next ) ->
    event = { prev, next }
    @_events.yield(event)

module.exports = AbstractList
