class ConcatenatedList extends AbstractList

  constructor: ( sources ) ->
    super()

    @_sources = Sonic.create(sources)
    @_listBySourceId = {}

    @_sources.each @_addSource
    @_sources.events.each @_onSourcesEvent

  _addSource: ( source ) =>
    source.events.each @_onSourceEvent

  _onSourceEvent: ( event ) =>
    @events.yield
      type:   event.type
      id:     event.signal.id
      signal: event.signal
      list:   @

  _onSourcesEvent: ( event ) =>
    switch event.type
      when 'add'    then @_addSource    event.signal.value()
      when 'delete' then @_removeSource event.signal.value()

  before: ( signal = @_sentinel ) ->
    list = if signal is @_sentinel
      @_sources.last()
    else @_listBySourceId[signal.id]

    if list?
      previous = list.before signal
      until previous or not list
        list = @_sources.before(@_sources.signalOf(list))?.value()
        previous = list?.before()

    if previous? and not @_listBySourceId[previous.id]?
      @_listBySourceId[previous.id] = list

    return previous

  after: ( signal = @_sentinel ) ->
    list = if signal is @_sentinel
      @_sources.first()
    else @_listBySourceId[signal.id]

    if list?
      next = list.after signal
      until next or not list
        list = @_sources.after(@_sources.signalOf(list))?.value()
        next = list?.after()

    if next? and not @_listBySourceId[next.id]?
      @_listBySourceId[next.id] = list

    return next
