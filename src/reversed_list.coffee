class ReversedList extends ProxyList

  constructor: ( source ) ->
    @_source = source
    @_byId  = @_source._byId
    @_prev  = @_source._prev
    @_next  = @_source._next
    @events = @_source.events

    # super
    # @_move @_sentinel, after: @_sentinel


  before: ( signal ) ->
    return @_source.after(signal)

  after: ( signal ) ->
    return @_source.before(signal)
