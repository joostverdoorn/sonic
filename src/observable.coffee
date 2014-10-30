class Observable

  constructor: ( ) ->
    @_events = {}

  on: ( name, callback, context ) ->
    @_events[name]?.push({
      callback: callback,
      context:  context
    }) or @_events[name] = [
      callback: callback,
      context:  context
    ]

    return true

  off: ( name, callback, context ) ->
    return false unless @_events

    events = @_events[name]
    for i in [0 ... events.length]
      event = events[i]
      if (not callback or callback is event.callback) and
         (not context or context is event.context)
        events.splice(i, 1)

    return true

  once: ( name, callback, context ) ->
    fn = ( args... ) ->
      callback(args...)
      @off(name, fn, context)

    @on(name, fn, context)
    return true

  trigger: ( name, args... ) ->
    return false unless @_events

    events = @_events[name]
    return unless events and events.length > 0

    for event in events
      event.callback.apply(event.context || @, args)

    # Trigger an event for catch-all listeners.
    @trigger('*', name, args...) unless name is '*'
    return true
