class ConcatenatedList extends AbstractList

  constructor: ( sources ) ->
    super()

    @_sources = Sonic.create(sources)

    @_sources.each @_addSource
    @_sources.events.each @_onSourcesEvent


  @_addSource: ( source ) =>
    @_source.events.each @_onSourceEvent


  @_onSourceEvent: ( event ) =>
    @events.yield
      type:   event.type
      id:     event.signal.id
      signal: event.signal
      list:   @

  @_onSourcesEvent: ( event ) =>
    switch event.type
      when 'add'    then @_addSource    event.signal.value()
      when 'delete' then @_removeSource event.signal.value()
      # when 'update' then @_addSource    event
      # when 'move'





  # _create: ( source, options ) ->
  #   signals = @_transformer(source)
  #   return undefined unless signals
  #   for signal in signals
  #     @_add(signal, signal, options)
  #   return signals


  # _update

  # _delete

  # _transformer: ( source, signal ) ->
  #   list = source.value()
  #   signals = []
  #   unless signal
  #     list.events.each ( event ) =>
  #       @events.yield(event)

  #     iterator = list.getIterator()
  #     while iterator.moveNext()
  #       signals.push iterator.signal unless iterator.signal is @_sentinel
  #   return signals



  # before: ( signal = @_sentinel ) ->
  #   list = null
  #   @each (source) ->
  #     if source.contains(signal)
  #       list = source
  #       return false

  #   previous = list.before signal
  #   until previous or not list
  #     list = @before(list).value()
  #     previous = list.last()

  #   return previous

  # after: ( signal = @_sentinel ) ->
  #   if list = @_getSourceList( signal )
  #     return list.after signal
  #   else return null

  # _getSourceList: ( signal ) ->
  #   if signal is @_sentinel
  #     return @_source.first()

  #   # Find source list
  #   list = null
  #   @_source.each (source) ->
  #     if source.contains(signal)
  #       list = source
  #       return false
  #     else console.log "nope", signal.value()

  #   return list
