class SimpleList extends AbstractList

  constructor: ( values ) ->
    super

    @_previous[@_tailSignal.id] = @_headSignal
    @_next[@_headSignal.id] = @_tailSignal

    signal = @_insertAfter(value, signal) for value in values if values

  set: ( id, value, options = {} ) ->
    signal = @getSignal(id)
    return false unless signal

    signal.value(value)
    return true

  push: ( value, options = {} ) ->
    return @_insertBefore(value).id

  unshift: ( value, options = {}) ->
    return @_insertAfter(value).id

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

