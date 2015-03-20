uniqueId     = require('./unique_id')
Signal       = require('./signal')
Iterator     = require('./iterator')
AbstractList = require('./abstract_list')
List         = require('./list')
Unit         = require('./unit')
FlatMapList  = require('./flat_map_list')
GroupList    = require('./group_list')
TakeList     = require('./take_list')

# Creates a list from an array
#
# @param [Array, AbstractList] items The initial values for the list
# @return [List] The list containing the given values
#
Sonic = ( items = [] ) ->
  if items instanceof AbstractList
    return items
  return new List(items)

# Creates a new Unit containing the given item
#
# @param [any] item The value for the Unit
# @return [Unit] The Unit with the given item
#
Sonic.unit = ( item ) ->
  return new Unit(item)

# Creates an empty Unit
#
# @return [Unit] An empty Unit
#
Sonic.empty = ( ) ->
  return new Unit()

# Creates an iterator over the given array or list
#
# @param[Array,AbstractList] list The array or list to iterate
# @param[Number] start The id of the item to start at. Can be omitted to start at the first item
# @return [Iterator] A new iterator that iterates the given array or list
#
Sonic.getIterator = ( list, start ) ->
  list = Sonic(list)
  return new Iterator(list, start)

# Alias for `forEach`
#
# @param [Array, AbstractList] list The array or list to iterate
# @param [Function] fn The function to execute on each iteration. If the function call returns false explicitly, iteration will be interupted at that point.
# @return [Boolean] true if all the function executions return true, false otherwise.
#
Sonic.each = ( list, fn ) ->
  list = Sonic(list)
  return Sonic.forEach(list, fn)

# Iterates over a array or list and executes a function with the value and id of the item at each position
#
# @param [Array, AbstractList] list The array or list to iterate
# @param [Function] fn The function to execute on each iteration. If the function call returns false explicitly, iteration will be interupted at that point.
# @return [Boolean] true if all the function executions return true, false otherwise.
#
Sonic.forEach = ( list, fn ) ->
  list = Sonic(list)
  iterator = Sonic.getIterator(list)

  while iterator.moveNext()
    return false if fn(iterator.current(), iterator.currentId) is false
  return true

# Executes a function on each item and returns the id of the first item for which the function returns a truthy value
#
# @param [Array, AbstractList] list The array or list to search
# @param [Function] fn The function to execute on each item
# @return [Number] The id of the first matching item. Returns undefined if no item matches
#
Sonic.findId = ( list, fn ) ->
  list = Sonic(list)
  result = undefined

  Sonic.each list, ( value, id ) ->
    if fn(value)
      result = id
      return false

  return result

# Executes a function on each item and returns the value of the first item for which the function returns a truthy value
#
# @param [Array, AbstractList] list The array or list to search
# @param [Function] fn The function to execute on each item
# @return [any] The value of the first matching item. Returns undefined if no item matches
#
Sonic.find = ( list, fn ) ->
  list = Sonic(list)
  return list.get(Sonic.findId(list, fn))

# Returns the id of the item in the given array or list at the given index
#
# @param [Array, AbstractList] list The array or list to search
# @param [Number] index The index to match
# @return [Number] The id of the item at the given index. Returns undefined if there is no item at the index
#
Sonic.idAt = ( list, index ) ->
  list = Sonic(list)
  i = 0
  return Sonic.findId(list, -> if i++ is index then true)

# Returns the id of the first item in the given array or list that equals the given value
#
# @param [Array, AbstractList] list The array or list to search
# @param [Number] value The value to match
# @return [Number] The id of the item with the given value. Returns undefined if there is no item that matches the value
#
Sonic.idOf = ( list, value ) ->
  list = Sonic(list)
  return Sonic.findId(list, ( v ) -> v is value )

# Returns the value of the item in the given array or list at the given index
#
# @param [Array, AbstractList] list The array or list to search
# @param [Number] index The index to match
# @return [any] The value of the item at the given index. Returns undefined if there is no item at the index
#
Sonic.at = ( list, index ) ->
  list = Sonic(list)
  return list.get(Sonic.idAt(list, index))

# Returns the index of the first item in the given array or list that matches the given value
#
# @param [Array, AbstractList] list The array or list to search
# @param [any] value The value to match
# @return [Number] The index of the first item that matches the given value. Returns -1 if there is no item that matches the value
#
Sonic.indexOf = ( list, value ) ->
  list = Sonic(list)
  i = -1
  if Sonic.some(list, ( v ) -> i++; v is value )
    return i
  else return -1

# Tests if there is some item in the given array or list for which the given predicate holds
#
# @param [Array, AbstractList] list The array or list to search
# @param [Function] predicate The predicate to test
# @return [Boolean] True if the predicate holds for any item, false otherwise
#
Sonic.some = ( list, predicate ) ->
  list = Sonic(list)
  return not Sonic.each(list, -> not predicate(arguments...) )

# Alias for `some`
#
# @param [Array, AbstractList] list The array or list to search
# @param [Function] predicate The predicate to test
# @return [Boolean] True if the predicate holds for any item, false otherwise
#
Sonic.any = ( list, predicate ) ->
  list = Sonic(list)
  return Sonic.some(list, predicate)

# Tests if there is some item in the given array or list with the given value
#
# @param [Array, AbstractList] list The array or list to search
# @param [Function] predicate The predicate to test
# @return [Boolean] True if the predicate holds for any item, false otherwise
#
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

Sonic.uniqueId      = uniqueId
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

