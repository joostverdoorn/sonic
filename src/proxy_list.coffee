class ProxyList extends AbstractList

  constructor: ( source ) ->
    # @_sources = Sonic.create sources

    # @_sources.each @_addSource
    # @_sources.events.each @_onSourcesEvent



    # # ( source ) =>

    #   source.each ( value ) =>
    #   source.events.each ( ) =>
    # @_sources.events.each

    @_source = source
    @_byId  = @_source._byId
    @_prev  = @_source._prev
    @_next  = @_source._next
    @events = @_source.events

    # for source in @_sources
    #   source.events.forEach (event) =>
    #     @events.yield(event)

    # super
    # @_move @_sentinel, after: @_sentinel

  _addSource: ( source ) =>
    source.events.each @_onSourceEvent

  # _onSourcesEvent: ( event ) =>
  #   switch event.type
  #     when 'add' then @_addSource()
  #     when 'delete'
  #     when 'update'
  #     when 'move'

  # _create:
  # _add: null

  before: ( ) ->



  after: ( ) ->


