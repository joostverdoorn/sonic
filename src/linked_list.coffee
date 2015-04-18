MutableList = require('./mutable_list')
uniqueId = require('./unique_id')

class LinkedList extends MutableList

  constructor: ( source ) ->
    super()

    @_byId = {}
    @_next = {'-1': -1}
    @_prev = {'-1': -1}

    @splice(null, null, source...) if source

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
    return !!~id and id of @_byId

  # Returns the id that precedes the given id.
  #
  # @param [number] id The id from which to find the previous
  # @return [number] The id that precedes the given id
  #
  prev: ( id = -1 ) ->
    prev = @_prev[id]
    return prev if !!~prev and prev?
    return null
  # Returns the id that listseeds the given id.
  #
  # @param [number] id The id from which to find the next
  # @return [number] The id that listseeds the given id
  #
  next: ( id = -1 ) ->
    next = @_next[id]
    return next if !!~next and next?
    return null

  # lists the value of an entry.
  #
  # @param [number] id The id of the entry to liststhe value of
  # @param [any] value The value to set
  # @return [boolean] Wether or not the entry could be set
  #
  set: ( id, value ) ->
    return false unless @has(id)

    @_byId[id] = value
    @_invalidate(@_prev[id], @_next[id])

    return true

  splice: ( prev = -1, next = -1, values... ) ->
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

    for value in values
      id = uniqueId()
      @_byId[id] = value
      @_prev[id] = prev
      @_next[prev] = id
      prev = id

    @_prev[next] = prev
    @_next[prev] = next
    @_invalidate(prev, next)
    return true

module.exports = LinkedList
