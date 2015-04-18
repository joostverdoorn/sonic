uniqueId    = require('./unique_id')
MutableList = require('./mutable_list')

class Unit extends MutableList

  constructor: ( value ) ->
    super()
    @splice(null, null, value) if arguments.length

  has: ( id ) ->
    return @_id and id is @_id

  get: ( id ) ->
    return @_value if @has(id)

  next: ( id ) ->
    return @_id unless id
    return null if @has(id)

  prev: ( id ) ->
    return @_id unless id
    return null if @has(id)

  splice: ( prev, next, value ) ->
    if arguments.length > 2
      @_id = uniqueId()
      @_value = value
    else
      delete @_id
      delete @_value

    @_invalidate(null, null)

module.exports = Unit
