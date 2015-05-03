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

  set: ( id, value ) ->
    @_id = id
    @_value = value
    @_invalidate()
    return true

  splice: ( prev, next, value ) ->
    return @set(uniqueId(), value) if arguments.length > 2

    delete @_id
    delete @_value
    @_invalidate()

    return true

module.exports = Unit
