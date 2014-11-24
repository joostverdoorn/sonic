class SimpleList extends AbstractList

  constructor: ( values ) ->
    super

    @_previous[@_tailSignal.id] = @_headSignal
    @_next[@_headSignal.id] = @_tailSignal

    previous = @_headSignal
    for value in values
      signal = new Signal(value)
      @_previous[signal.id] = previous
      @_next[previous.id] = signal
      previous = signal

    @_previous[@_tailSignal.id] = previous
    @_next[previous.id] = @_tailSignal

  set: ( id, value, options = {} ) ->
    signal = @getSignal(id)
    return false unless signal

    signal.yield(value)
    return true

  push: ( value, options = {} ) ->
    return @_createBefore(value).id

  unshift: ( value, options = {}) ->
    return @_createAfter(value).id

  pop: ( options ) ->
    signal = @before(@_tailSignal)
    @_delete(signal, options)
    return signal.value()

  shift: ( options ) ->
    signal = @after(@_headSignal)
    @_delete(signal, options)
    return signal.value()

  add:  ( value, options ) ->
    return @push(value, options)

  remove: ( value, options ) ->
    signal = @signalOf(value)
    return @_delete(signal, options)

  delete: ( id, options ) ->
    signal = @getSignal(id)
    return @_delete(signal, options)

