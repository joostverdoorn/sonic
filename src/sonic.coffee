Signal       = require( './signal')
Iterator     = require( './iterator')
AbstractList = require( './abstract_list')
List         = require( './list')
Unit         = require( './unit')
FlatMapList  = require( './flat_map_list')
GroupList    = require( './group_list')
TakeList     = require( './take_list')

Sonic = ( items = [] ) ->
  if items instanceof AbstractList
    return items
  return new List(items)

Sonic._uniqueCounter = 1

Sonic.uniqueId = ( ) ->
  return Sonic._uniqueCounter++

Sonic.unit = ( item ) ->
  return new Unit(item)

Sonic.empty = ( ) ->
  return new Unit()

  #
Sonic.getIterator = ( list, start ) ->
  list = Sonic(list)
  return new Iterator(list, start)

Sonic.each = ( list, fn ) ->
  list = Sonic(list)
  return Sonic.forEach(list, fn)

Sonic.forEach = ( list, fn ) ->
  list = Sonic(list)
  iterator = Sonic.getIterator(list)

  while iterator.moveNext()
    return false if fn(iterator.current(), iterator.currentId) is false
  return true

Sonic.findId = ( list, fn ) ->
  list = Sonic(list)
  result = undefined

  Sonic.each list, ( value, id ) ->
    if fn(value)
      result = id
      return false

  return result

Sonic.find = ( list, fn ) ->
  list = Sonic(list)
  return list.get(Sonic.findId(list, fn))

Sonic.idAt = ( list, index ) ->
  list = Sonic(list)
  i = 0
  return Sonic.findId(list, -> if i++ is index then true)

Sonic.idOf = ( list, value ) ->
  list = Sonic(list)
  return Sonic.findId(list, ( v ) -> v is value )

Sonic.at = ( list, index ) ->
  list = Sonic(list)
  return list.get(Sonic.idAt(list, index))

Sonic.indexOf = ( list, value ) ->
  list = Sonic(list)
  i = -1
  if Sonic.some(list, ( v ) -> i++; v is value )
    return i
  else return -1

Sonic.some = ( list, predicate ) ->
  list = Sonic(list)
  return not Sonic.each(list, -> not predicate(arguments...) )

Sonic.any = ( list, predicate ) ->
  list = Sonic(list)
  return Sonic.some(list, predicate)

Sonic.contains = ( list, value ) ->
  list = Sonic(list)
  return Sonic.some(list, ( v ) -> v is value)

Sonic.first = ( list ) ->
  list = Sonic(list)
  return list.get(list.next())

Sonic.last = ( list ) ->
  list = Sonic(list)
  return list.get(list.prev())

Sonic.reduce = ( list, reduceFn, memo ) ->
  list = Sonic(list)
  Sonic.each(list, ( value, id ) -> reduceFn(memo, value, id))
  return memo

Sonic.flatMap = ( list, flatMapFn ) ->
  list = Sonic(list)
  return new FlatMapList(list, flatMapFn)

Sonic.group = ( list, groupFn ) ->
  list = Sonic(list)
  return new GroupList(list, groupFn)

Sonic.sort = ( list, sortFn ) ->
  list = Sonic(list)
  return new SortedList(list, sortFn: sortFn)

Sonic.take = ( list, count ) ->
  list = Sonic(list)
  return new TakeList(list, count)

Sonic.map = ( list, mapFn ) ->
  list = Sonic(list)
  return Sonic.flatMap(list, ( value ) -> new Unit(mapFn(value)))

Sonic.pluck = ( list, key ) ->
  list = Sonic(list)
  return Sonic.map(list, ( value ) -> value[key])

Sonic.invoke = ( list, key, args... ) ->
  list = Sonic(list)
  return Sonic.map(list, ( value ) -> value[key](args...))

Sonic.filter = ( list, filterFn ) ->
  list = Sonic(list)
  return Sonic.flatMap(list, ( value ) -> if filterFn(value) then new Unit(value) else new Unit())

Sonic.concat = ( lists... ) ->
  list = Sonic(list)
  return Sonic.flatMap(lists, ( list ) -> list)

Sonic.flatten = ( list ) ->
  list = Sonic(list)
  return Sonic.flatMap(list, ( list ) -> list)

Sonic.uniq = ( list, groupFn = ( x ) -> x ) ->
  list = Sonic(list)
  return Sonic.flatMap(Sonic.group(list, groupFn), ( list ) -> list.take(1))

Sonic.union = ( lists... ) ->
  list = Sonic(list)
  return Sonic.concat(lists...).uniq()

Sonic.intersection = ( list, other ) ->
  list = Sonic(list)
  return Sonic.filter(list, other.contains)

Sonic.proxy = ( list, fns = { 'get', 'has', 'prev', 'next', 'onInvalidate' } ) ->
  list = Sonic(list)
  proxy = new AbstractList
  proxy[key] = list[fn].bind(list) for key, fn of fns
  return proxy

Sonic.reverse = ( list ) ->
  list = Sonic(list)
  fns = { 'get', 'has', 'prev': 'next', 'next': 'prev' }
  proxy = Sonic.proxy(list, fns)

  proxy.onInvalidate = ( callback ) ->
    list.onInvalidate ( event ) ->
      callback(prev: event.next, next: event.prev)

  return proxy

Sonic.toArray = ( list ) ->
  list = Sonic(list)
  Sonic.reduce(list, (( memo, value ) -> memo.push(value)), [])

Sonic.Signal        = Signal
Sonic.Iterator      = Iterator
Sonic.AbstractList  = AbstractList
Sonic.Unit          = Unit
Sonic.List          = List
Sonic.FlatMapList   = FlatMapList
Sonic.GroupList     = GroupList
Sonic.TakeList      = TakeList

fns = [
  'getIterator', 'each', 'forEach',
  'at', 'idAt', 'idOf',
  'indexOf', 'contains', 'any',
  'some', 'find', 'reduce',
  'first', 'last', 'toArray',
  'flatMap', 'group', 'sort',
  'take', 'map', 'pluck'
  'invoke', 'filter', 'concat',
  'flatten', 'uniq', 'union',
  'intersection', 'proxy', 'reverse'
]

fns.forEach ( fn ) -> AbstractList::[fn] = -> Sonic[fn](@, arguments...)

module.exports = Sonic

