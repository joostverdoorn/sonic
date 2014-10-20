Events =
  on: ( ) ->
    if typeof arguments[0] is 'string'
      name = arguments[0]
      callback = arguments[1]
      context = arguments[2] || null

      @_events = {} unless @_events?
      @_events[name] = [] unless @_events[name]?

      event =
        callback: callback
        context: context

      @_events[name].push(event)

    else if typeof arguments[0] is 'object'
      bindings = arguments[0]

      for name, callback of bindings
        @on(name, callback)

    return @

  off: ( name = null, callback = null, context = null ) ->
    return unless @_events?

    names = if name then [ name ] else _.keys(@_events)
    for name in names
      unless @_events[name]? then return
      for event in @_events[name]
        if ( not callback? or callback is event.callback ) and
            ( not context? or context is event.context )
          @_events[name] = _(@_events[name]).without event

    return @


  once: ( ) ->
    if typeof arguments[0] is 'string'
      name = arguments[0]
      callback = arguments[1]
      context = arguments[2] || null

      fn = ( args... ) ->
        callback.apply(context, args)
        @off(name, arguments.callee, context)

      @on(name, fn, context)

    else if typeof arguments[0] is 'object'
      bindings = arguments[0]

      for name, callback of bindings
        @once(name, callback)

    return @

  trigger: ( name, args... ) ->
    return unless @_events?

    if @_events[name]?.length > 0
      for event in @_events[name]
        event.callback.apply(event.context ? @, args)

    # Trigger an event for catch-all listeners.
    unless name is '*' or @_events['*']?.length is 0
      args.unshift('*')
      @trigger.apply(@, args)

    return @
