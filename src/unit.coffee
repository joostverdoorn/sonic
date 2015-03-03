class Unit extends AbstractList

  constructor: ( value ) ->
    super

    @_id = Sonic.uniqueId()

    if arguments.length
      @_add(value, id: @_id, next: 0, prev: 0)

  set: ( value ) ->
    return @_set(@_id, value)

  delete: ( ) ->
    return @_delete(@_id)

  get: ( ) ->
    return super(@_id)

  has: ( ) ->
    return super(@_id)
