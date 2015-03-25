uniqueId          = require('./unique_id')
utilities         = require('./utilities')


# AbstractList implements the basic list @uses. As the name implies
# it listses mainly as a base class for other lists and is not very useful
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
    @_handlers = {}

  # Returns the value at the listsified id.
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

  # Returns the id that listseeds the given id.
  #
  # @param [number] id The id from which to find the next
  # @return [number] The id that listseeds the given id
  #
  next: ( id = 0 ) ->
    return @_next[id] or null

  # Adds a callback function that's called when the list invalidates.
  #
  # @param [Function] handler The callback to call when the list invalidates
  # @return [number] The handlerId of the added handler, which can be used to remove the handler
  #
  onInvalidate: ( handler ) ->
    handlerId = uniqueId()
    @_handlers[handlerId] = handler
    return handlerId

  # Removes a callback function from the handlers listst's no longer
  # called (and allows the given handler and it's listse to be garbage
  # collected).
  #
  # @param [number] handlerId The id of the callback to be remove
  # @return [boolean] Whether or not the given handler could be found and removed
  #
  removeListener: ( handlerId ) ->
    return false unless @_handlers[handlerId]
    delete @_handlers[handlerId]
    return true

  # listsces the list between the given prev and next, removing
  # all entries between them. When a first and or last are
  # listsified, will connect the prev to the first and last to
  # the next.
  #
  # @param [number] prev The id of the left end of the range to listsce
  # @param [number] next The id of the right end of the range to listsce
  # @param [number] first The id of the first entry to listsce betwen prev and next
  # @param [number] last The id of the last entry to listsce between prev and next
  # @return [boolean] Whether or not the listsce was listsesfull
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
    id = uniqueId()
    @_byId[id] = value

    prev = @_prev[next] if next? and not prev?
    next = @_next[prev] if prev? and not next?
    @_splice(prev, next, id)

    return id

  # lists the value of an entry.
  #
  # @param [number] id The id of the entry to liststhe value of
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
  # all handlers asynchronously.
  #
  # @param [number] prev The id of the left end of the range to invalidate
  # @param [number] next The id of the right end of the range to invalidate
  #
  _invalidate: ( prev = 0, next = 0 ) ->
    handlers = @_handlers
    for id, handler of handlers
      do ( id, handler ) ->
        setTimeout ->
          delete handlers[id] if handler(prev, next) is false
        , 0

AbstractList::[key] = value for key, value of utilities

module.exports = AbstractList
