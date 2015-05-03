class Observable

  @isObservable: ( obj ) ->
    !!obj.invalidate and !!obj.removeListener

  # Adds a callback function that's called when the list invalidates.
  #
  # @param [Function] handler The callback to call when the list invalidates
  # @return [number] The handlerId of the added handler, which can be used to remove the handler
  #
  onInvalidate: ( handler ) ->
    handlerId = uniqueId()

    @_handlers ||= Object.create(null)
    @_handlers[handlerId] = handler

    return handlerId

  # Removes a callback function from the handlers listst's no longer
  # called (and allows the given handler and it's listse to be garbage
  # collected).
  #
  # @param [number] handlerId The id of the callback to be remove
  # @return [boolean] Whether or not the given handler could be found and removed
  #
  removeListener: ( handlerId ) ->
    return false unless @_handlers and @_handlers[handlerId]
    delete @_handlers[handlerId]
    return true

  # Yields an invalidate event for the given range, calling
  # all handlers asynchronously.
  #
  # @param [number] id The id of the invalidated entry
  # @param [number] prev The id of the left end of the range to invalidate
  # @param [number] next The id of the right end of the range to invalidate
  #
  _invalidate: ( prev, next ) ->
    return false unless handlers = @_handlers

    setTimeout ->
      Object.keys(handlers).forEach ( handlerId ) ->
        delete handlers[handlerId] if handler(prev, next) is false

module.exports = Observable
