AbstractList = require('./abstract_list')
ArrayList    = require('./array_list')
Unit         = require('./unit')
utilities    = require('./utilities')


listFns = ['has', 'get', 'prev', 'next']
mutableFns = ['splice']
observableFns = ['onInvalidate', 'removeListener']


# predicates =
isList = ( obj ) ->
  memo = true
  memo = memo and obj[key]? for key in listFns
  return memo

isMutable = ( obj ) ->
  return obj['splice']?

isObservable = ( obj ) ->
  return obj['onInvalidate']? and obj['removeListener']?




factory = ( items ) ->
  if items instanceof AbstractList
    return items
  else if isList(items)
    list = new AbstractList
    list[key] = items[key].bind(items) for key in listFns
    list[key] = items[key].bind(items) for key in mutableFns if isMutable(items)
    list[key] = items[key].bind(items) for key in observableFns if isObservable(items)
    return list
  else if Array.isArray(items)
    return new ArrayList(items)
  else if arguments.length
    return new Unit(items)
  else return new Unit()

module.exports = factory
