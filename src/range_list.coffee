factory      = require("./factory")
AbstractList = require("./abstract_list")

class RangeList extends AbstractList

  constructor: ( source, start, count ) ->
    super()

    @_indexById = {}
    @_idByIndex = {}

    @_source = factory(source)
    @_source.onInvalidate @_onSourceInvalidate

    @_start = factory(start or 0)
    @_start.onInvalidate @_onStartInvalidate

    @_count = factory(count or 0)
    @_count.onInvalidate @_onCountInvalidate

    # Set the sentinel as the first index
    start = @_start.last()
    @_indexById[0] = -start-1
    @_idByIndex[-start-1] = 0

  get: ( id ) ->
    return @_source.get(id)

  has: ( id ) ->
    start = @_start.last()
    count = @_count.last()
    return 0 <= @_indexById[id] < count

  prev: ( id = 0 ) ->
    count = @_count.last()

    # If we have no id, but have evaluated
    # the full list, return the last item.
    return @_idByIndex[count - 1] or @idAt(count - 1) if id is 0

    # If we have the index of the given id and
    # the decremented index is within the range,
    # we return the id corresponding to the
    # decremented id.
    if (index = @_indexById[id])?
      return if 0 <= index - 1 < count
        @_idByIndex[index - 1]
      else null

    # Iterate over the source list until
    # we find the correct id.
    while next = @next(next)
      return @_source.prev(next) if next is id
    return null

  next: ( id = 0 ) ->
    current = id
    count = @_count.last()
    index = @_indexById[id] ? -@_start.last()-1

    # Iterate over the source list until
    # we find the correct id.
    while ++index < count
      unless next = @_idByIndex[index]
        @_idByIndex[index] = next = @_source.next(current)
        @_indexById[next] = index

      return next if (id and current is id) or (not id and index is 0)
      current = next

    return null

  _onSourceInvalidate: ( prev, next ) =>
    @_invalidate(prev) if prev of @_indexById
    return true

  _onStartInvalidate: ( prev, next ) =>
    if next is 0
      start = @_start.last()
      @_invalidate()
      @_indexById[0] = -start-1
      @_idByIndex[-start-1] = 0
    return true

  _onCountInvalidate: ( prev, next ) =>
    if next is 0
      count = @_count.last()
      @invalidate(id) if id = @_idByIndex[count]
    return true

  _invalidate: ( prev = 0, next = 0 ) ->
    return unless index = @_indexById[prev]
    while id = @_idByIndex[++index]
      delete @_idByIndex[index]
      delete @_indexById[id]

    super(prev, 0)

module.exports = RangeList

