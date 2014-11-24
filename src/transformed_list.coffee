class TransformedList extends AbstractList

  constructor: ( source, options = {} ) ->

    @_source = source
    @_source.events.forEach @_onSourceEvent

    @_bySourceId = {}
    @_sourceById = {}

    @_mapFn    = options.mapFn    or ( value ) -> value
    @_filterFn = options.filterFn or ( value ) -> true

    super

  _transformer : ( sourceSignal, signal ) ->
    # debugger
    if @_filterFn(sourceSignal.value())
      value = @_mapFn(sourceSignal.value())

      if signal
        signal.yield(value)
      else signal = new Signal(value)

      return signal
    else return null


  _create: ( sourceSignal, options ) ->
    signal = @_transformer(sourceSignal)
    return signal unless signal

    @_add(signal, sourceSignal, options)


    return signal

  _add: ( signal, sourceSignal, options ) ->
    # debugger if sourceSignal.value() is 13
    @_bySourceId[sourceSignal.id] = signal
    @_sourceById[signal.id] = sourceSignal

    # Find the next and previous
    # of this signal

    super(signal, options)


  _move: ( signal ) ->
    # source = @_sourceById[signal.id]
    # after = null
    # before = null

    super signal, silent: true

    @before signal
    @after signal

    @events.yield
      type: 'move'
      object: @
      key: signal.id
      value: signal

    return true

    # iterator = @_source.getIterator source
    # iterator.moveNext() until after = @_bySourceId[iterator.signal.id]
    # iterator.reset()
    # iterator.movePrevious() until before = @_bySourceId[iterator.signal.id]



    # while afterSource and not after
    #   after = @_bySourceId[afterSource.id]
    #   afterSource = @_source.after(afterSource)

    # while beforeSource and not before
    #   before = @_bySourceId[beforeSource.id]
    #   beforeSource = @_source.before(beforeSource)

    # super signal, { before, after }


  _delete: ( signal, options ) ->
    id = signal.id
    source = @_bySourceId[id]

    delete @_bySourceId[source.id]
    delete @_sourceById[id]

    super(signal, options)

  _onSourceEvent: ( event ) =>
    sourceSignal = event.value
    switch event.type
      when 'add'
        signal = @_create(sourceSignal)

      when 'delete'
        signal = @_bySourceId[sourceSignal.id]
        @_delete(signal) if signal

      when 'update'
        oldSignal = @_bySourceId[sourceSignal.id]
        signal = @_transformer(sourceSignal)

        if oldSignal is signal
          @events.yield
            type: 'update'
            object: @
            key: signal.id
            value: signal
        else
          @_delete oldSignal if oldSignal
          @_add signal, sourceSignal if signal

    return true

  before: ( signal ) ->
    return @before(@_tailSignal) unless signal

    before = super(signal)
    return before unless before is undefined

    source = @_sourceById[signal.id]
    beforeSource = @_source.before(source)
    return beforeSource unless beforeSource

    until other = @_createBefore(beforeSource, signal)
      beforeSource = @_source.before(beforeSource)
      return beforeSource unless beforeSource

    return other

  after: ( signal ) ->
    return @after(@_headSignal) unless signal

    after = super(signal)
    return after unless after is undefined

    source = @_sourceById[signal.id]
    afterSource = @_source.after(source)
    return afterSource unless afterSource

    until other = @_createAfter(afterSource, signal)
      afterSource = @_source.after(afterSource)
      return afterSource unless afterSource

    return other
