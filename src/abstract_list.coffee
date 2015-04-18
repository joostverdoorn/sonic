uniqueId          = require('./unique_id')
utilities         = require('./utilities')

# AbstractList implements the basic list operations and, as the name implies
# it serves mainly as a base class for other lists and is not very useful on
# its own.
#
class AbstractList

  constructor: ( ) ->
    @_handlers = {}

  # Adds a callback function that's called when the list invalidates.
  #
  # @param [Function] handler The callback to call when the list invalidates
  # @return [number] The handlerId of the added handler, which can be used to remove the handler
  #
  onInvalidate: ( handler ) ->
    handlerId = uniqueId()
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
    return false unless @_handlers[handlerId]
    delete @_handlers[handlerId]
    return true

  # Yields an invalidate event for the given range, calling
  # all handlers asynchronously.
  #
  # @param [number] prev The id of the left end of the range to invalidate
  # @param [number] next The id of the right end of the range to invalidate
  #
  _invalidate: ( prev, next ) ->
    handlers = @_handlers
    for id, handler of handlers
      do ( id, handler ) ->
        setTimeout ->
          delete handlers[id] if handler(prev, next) is false
        , 0

AbstractList::[key] = value for key, value of utilities

module.exports = AbstractList
