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

  before: ( signal = @_sentinel, depth = Infinity ) ->
    before = super(signal)
    if before isnt undefined or depth < 1
      return before

    source = @_sourceById[signal.id]
    until before or not source = @_source.before(source, depth - 1)
      before = @_transformer(source)

    unless before and source
      return null

    @_add(before, source, before: signal, silent: true)
    return before

  after: ( signal = @_sentinel, depth = Infinity ) ->
    after = super(signal)
    if after isnt undefined or depth < 1
      return after

    source = @_sourceById[signal.id]
    until after or not source = @_source.after(source, depth - 1)
      after = @_transformer(source)

    unless after and source
      return null

    @_add(after, source, after: signal, silent: true)
    return after


  _onSourceEvent: ( event ) =>
    switch event.type
      when 'invalidate'
        # event.pre.after
        # event.pre.before
        # event.post.after
        # event.post.before

        # Move
        if event.pre and event.post
          0

          # @_move(@_event.)
          # @_move(event.pre.after, before: event.pre.before)

        # Delete
        else if event.pre
          1
        # Add
        else if event.post
          2
        # Reset
        else
          3


        # before = event.from
        # after  = event.to

        # beforeFrom = @_source.before(from, 0)
        # afterTo    = @_source.after(to, 0)

        # unless beforeFrom or afterTo
        #   @_delete(f) if f = @_bySourceId[from.id]
        #   @_delete(t) if t = @_bySourceId[to.id]







      # if @_source.before()

      # while iterator.movePrevious() and not before
      #   before = @_bySourceId[iterator.signal.id]
      # return @_move(signal, before: before) if before

      # iterator.reset()
      # while iterator.moveNext() and not after
      #   after = @_bySourceId[iterator.signal.id]
      # return @_move(signal, after: after)

        # unless before = @_bySourceId[sourceBefore.id] {}
        #   iterator = @_source.getIterator(beforeSource)
        #   while iterator.moveNext() and not before = @_bySourceId[iterator.current().signal.id]
        #     3




          # before = @_bySourceId[iterator.next().signal.id] until before







      # when 'add'    then @_create(source)
      # when 'update' then signal and @_set(signal, source)
      # when 'move'   then signal and @_align(signal)
      # when 'delete' then signal and @_delete(signal)
