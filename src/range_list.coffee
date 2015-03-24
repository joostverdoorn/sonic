factory      = require("./factory")
AbstractList = require("./abstract_list")

class RangeList extends AbstractList

  constructor: ( source, start, count ) ->
    super()

    @_indexById = { 0:-1 }
    @_idByIndex = {'-1': 0 }

    @_source = factory(source)
    @_source.onInvalidate @_onSourceInvalidate

    @_start = factory(start or 0)
    @_start.onInvalidate @_onRangeInvalidate

    @_count = factory(count or 0)
    @_count.onInvalidate @_onRangeInvalidate

  get: ( id ) ->
    return @_source.get(id)

  has: ( id ) ->
    return id of @_indexById

  prev: ( id = 0 ) ->
    # i = @_indexById[id]
    # if id and i <= @_count.last()
    #   return @_source.prev(id)

    # j = @_count.last()
    # while j > 0
    #   j--
    #   break if prev = @_idByIndex[j]

    # while next = @next(next or prev)
    #   j++
    #   return @_source.prev(next) if next is id
    #   return next if id is 0 and j is @_count.last()

    # return @_idByIndex[j] if j < @_count.last()
    # return null



  next: ( id = 0 ) ->
    start = @_start.last()
    end = start + @_count.last()

    if (index = @_indexById[id]) and index < end
      return next if @_indexById[(index + 1)] = next

    index ||= -1

    until ++index >= end
      next = @_idByIndex[index] ||= @_source.next(current)
      return next if (id and current is id) or (not id and index is start)
      current = @_idByIndex[index]

    return null

  _onSourceInvalidate: ( prev, next ) =>
    @_invalidate(prev)
    return true

  _onRangeInvalidate: ( prev, next ) =>
    if next is 0 and id = @_idByIndex[@_start.last() + @_count.last()]
      @_invalidate(@_prev[id])
    return true

  _invalidate: ( prev = 0, next = 0 ) ->
    return unless i = @_indexById[prev]
    while id = @_idByIndex[++i]
      delete @_idByIndex[i]
      delete @_indexById[id]

    super(prev, 0)

module.exports = RangeList

