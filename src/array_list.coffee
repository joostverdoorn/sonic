MutableList = require('./mutable_list')

class ArrayList extends MutableList
  constructor: ( source ) ->
    @_source = source and source.slice(0) or []
    super()

  has: ( index ) ->
    return 0 <= index < @_source.length

  get: ( index ) ->
    return @_source[index]

  prev: ( index ) ->
    return unless @_source.length
    return @_source.length - 1  unless index?
    return index - 1 if @has(index) and @has(index - 1)

  next: ( index ) ->
    return unless @_source.length
    return 0 unless index?
    return index + 1 if @has(index) and @has(index + 1)

  set: ( index, value ) ->
    return false unless @has(id)
    @_source[index] = value
    return true

  splice: ( prev, next, items... ) ->
    debugger

    if not prev?
      prev = -1
    else if not @has(prev)
      return false

    if not next?
      next = @_source.length
    else if not @has(next)
      return false
    @_source.splice(prev+1, next - prev - 1, items...)
    return true

module.exports = ArrayList
