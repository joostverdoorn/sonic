class TransformedList extends AbstractList

  constructor: ( source, options = {} ) ->
    @_source = source
    @_source.events.forEach @_onSourceEvent

    @_bySourceId = {}
    @_sourceById = {}
    @_bySourceId[@_sentinel.id] = @_sentinel
    @_sourceById[@_sentinel.id] = @_sentinel

    @_mapFn    = options.mapFn    or ( value ) -> value
    @_filterFn = options.filterFn or ( value ) -> true

    super()

  _transformer : ( source, signal ) ->
    return undefined unless @_filterFn(source.value())

    value = @_mapFn(source.value())
    signal ||= new Signal
    signal.yield(value)

    return signal

  _create: ( source, options ) ->
    signal = @_transformer(source, signal)
    return undefined unless signal

    @_add(signal, source, options)
    return signal

  _add: ( signal, source, options ) ->
    @_bySourceId[source.id] = signal
    @_sourceById[signal.id] = source
    super(signal, options)

  _set: ( signal, source ) ->
    transformed = @_transformer(source, signal)

    unless transformed is signal
      @_delete(signal)
      @_add(transformed, source) if transformed
    return true

  _align: ( signal ) ->
    source   = @_sourceById[signal.id]
    iterator = @_source.getIterator(source)

    while iterator.movePrevious() and not before
      before = @_bySourceId[iterator.signal.id]
    return @_move(signal, before: before) if before

    iterator.reset()
    while iterator.moveNext() and not after
      after = @_bySourceId[iterator.signal.id]
    return @_move(signal, after: after)

  _delete: ( signal, options ) ->
    source = @_sourceById[signal.id]
    delete @_sourceById[signal.id]
    delete @_bySourceId[source.id]
    super(signal, options)

  before: ( signal = @_sentinel ) ->
    before = super(signal)
    if before isnt undefined
      return before

    source = @_sourceById[signal.id]
    until before or not source = @_source.before(source)
      before = @_transformer(source)

    unless before and source
      return null

    @_add(before, source, before: signal, silent: true)
    return before

  after: ( signal = @_sentinel ) ->
    after = super(signal)
    if after isnt undefined
      return after

    source = @_sourceById[signal.id]
    until after or not source = @_source.after(source)
      after = @_transformer(source)

    unless after and source
      return null

    @_add(after, source, after: signal, silent: true)
    return after

  _onSourceEvent: ( event ) =>
    source = event.signal
    signal = @_bySourceId[source.id]

    switch event.type
      when 'add'    then @_create(source)
      when 'update' then signal and @_set(signal, source)
      when 'move'   then signal and @_align(signal)
      when 'delete' then signal and @_delete(signal)
