class SimpleList extends AbstractList

  constructor: ( values ) ->
    super

    @_prev[@_sentinel.id] = @_sentinel
    @_next[@_sentinel.id] = @_sentinel

    prev = @_sentinel
    for value in values
      signal = new Signal(value)
      @_prev[signal.id] = prev
      @_next[prev.id] = signal
      prev = signal

    @_prev[@_sentinel.id] = prev
    @_next[prev.id] = @_sentinel

  set: ( id, value, options = {} ) ->
    signal = @_byId[id]
    return false unless signal

    signal.yield(value)
    return true

  push: ( value, options = {} ) ->
    signal = @_create(value, before: @_sentinel)
    return signal.id

  unshift: ( value, options = {}) ->
    signal = @_create(value, after: @_sentinel)
    return signal.id

  pop: ( options ) ->
    signal = @before(@_sentinel)
    @_delete(signal, options)
    return signal.value()

  shift: ( options ) ->
    signal = @after(@_sentinel)
    @_delete(signal, options)
    return signal.value()

  add: ( value, options ) ->
    signal = @push(value, options)
    return signal

  remove: ( value, options ) ->
    signal = @signalOf(value)
    return @_delete(signal, options) if signal?

  delete: ( id, options ) ->
    signal = @getSignal(id)
    return @_delete(signal, options)

