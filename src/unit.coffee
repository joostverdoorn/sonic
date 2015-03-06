AbstractList = require('./abstract_list')

class Unit extends AbstractList

  constructor: ( value ) ->
    super

    @_id = Sonic.uniqueId()
    @_value = value if arguments.length

  set: ( value ) ->
    @_value = value

  delete: ( ) ->
    delete @_value

  get: ( ) ->
    return @_value

  has: ( ) ->
    return '_value' of @

  next: ( id = 0 ) ->
    return @_id if id is 0 and @has()

  prev: ( id = 0 ) ->
    return @_id if id is 0 and @has()

module.exports = Unit
