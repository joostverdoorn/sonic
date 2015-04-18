AbstractList = require('./abstract_list')

class ArrayList extends AbstractList

  constructor: ( source ) ->
    super()
    @_source = source or []

  has: ( index ) ->
    return -1 < index < @_source.length

  get: ( index ) ->
    return @_source[index]

  prev: ( index ) ->
    length = @_source.length

    return unless length
    return length - 1 unless index?
    return index - 1 if -1 < index - 1 < index < length

  next: ( index ) ->
    length = @_source.length

    return unless length
    return 0 unless index?
    return index + 1 if -1 < index < index + 1 < length

  # set: ( index, value ) ->
  #   return false unless @has(index)
  #   @_source[index] = value

  #   prev = if index > 0 then index - 1 else null
  #   next = if index < @_source.length - 1 then index + 1 else null
  #   @_invalidate(prev, next)
  #   return true

  # splice: ( prev, next, values... ) ->
  #   if not prev?
  #     prev = -1
  #   else if not @has(prev)
  #     return false

  #   if not next?
  #     next = @_source.length
  #   else if not @has(next)
  #     return false

  #   @_source.splice(prev + 1, next - prev - 1, values...)
  #   @_invalidate(prev, null)
  #   return true

module.exports = ArrayList
