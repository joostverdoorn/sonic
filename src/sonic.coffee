`
import Signal       from './signal'
import Iterator     from './iterator'
import AbstractList from './abstract_list'
import List         from './list'
import Unit         from './unit'
import FlatMapList  from './flat_map_list'
import GroupList    from './group_list'
import TakeList     from './take_list'
`

Sonic =

  _uniqueCounter: 1

  uniqueId: ( ) ->
    return Sonic._uniqueCounter++

  create: ( items = [] ) ->
    if items instanceof AbstractList
      return items
    return new List(items)

  unit: ( item ) ->
    return new Unit(item)

  empty: ( ) ->
    return new Unit()

  #
  getIterator: ( list, start ) ->
    return new Iterator(list, start)

  each: ( list, fn ) ->
    return Sonic.forEach(list, fn)

  forEach: ( list, fn ) ->
    iterator = Sonic.getIterator(list)

    while iterator.moveNext()
      return false if fn(iterator.current(), iterator.currentId) is false
    return true

  findId: ( list, fn ) ->
    result = undefined

    Sonic.each list, ( value, id ) ->
      if fn(value)
        result = id
        return false

    return result

  find: ( list, fn ) ->
    return list.get(Sonic.findId(list, fn))

  idAt: ( list, index ) ->
    i = 0
    return Sonic.findId(list, -> if i++ is index then true)

  idOf: ( list, value ) ->
    return Sonic.findId(list, ( v ) -> v is value )

  at: ( list, index ) ->
    return list.get(Sonic.idAt(list, index))

  indexOf: ( list, value ) ->
    i = -1
    if Sonic.some(list, ( v ) -> i++; v is value )
      return i
    else return -1

  some: ( list, predicate ) ->
    return not Sonic.each(list, -> not predicate(arguments...) )

  any: ( list, predicate ) ->
    return Sonic.some(list, predicate)

  contains: ( list, value ) ->
    return Sonic.some(list, ( v ) -> v is value)

  first: ( list ) ->
    return list.get(list.next())

  last: ( list ) ->
    return list.get(list.prev())

  reduce: ( list, reduceFn, memo ) ->
    Sonic.each(list, ( value, id ) -> reduceFn(memo, value, id))
    return memo

  flatMap: ( list, flatMapFn ) ->
    return new FlatMapList(list, flatMapFn)

  group: ( list, groupFn ) ->
    return new GroupList(list, groupFn)

  sort: ( list, sortFn ) ->
    return new SortedList(list, sortFn: sortFn)

  take: ( list, count ) ->
    return new TakeList(list, count)

  map: ( list, mapFn ) ->
    return Sonic.flatMap(list, ( value ) -> new Unit(mapFn(value)))

  pluck: ( list, key ) ->
    return Sonic.map(list, ( value ) -> value[key])

  invoke: ( list, key, args... ) ->
    return Sonic.map(list, ( value ) -> value[key](args...))

  filter: ( list, filterFn ) ->
    return Sonic.flatMap(list, ( value ) -> if filterFn(value) then new Unit(value) else new Unit())

  concat: ( lists... ) ->
    return Sonic.flatMap(lists, ( list ) -> list)

  flatten: ( list ) ->
    return Sonic.flatMap(list, ( list ) -> list)

  uniq: ( list, groupFn = ( x ) -> x ) ->
    return Sonic.flatMap(Sonic.group(list, groupFn), ( list ) -> list.take(1))

  union: ( lists... ) ->
    return Sonic.concat(lists...).uniq()

  intersection: ( list, other ) ->
    return Sonic.filter(list, other.contains)

  proxy: ( list, fns = { 'get', 'has', 'prev', 'next', 'onInvalidate' } ) ->
    proxy = new AbstractList
    proxy[key] = list[fn].bind(list) for key, fn of fns
    return proxy

  reverse: ( list ) ->
    fns = { 'get', 'has', 'prev': 'next', 'next': 'prev' }
    proxy = Sonic.proxy(list, fns)

    proxy.onInvalidate = ( callback ) ->
      list.onInvalidate ( event ) ->
        callback(prev: event.next, next: event.prev)

    return proxy

  toArray: ( list ) ->
    Sonic.reduce(list, (( memo, value ) -> memo.push(value)), [])

  Signal:       Signal
  Iterator:     Iterator
  AbstractList: AbstractList
  Unit:         Unit
  List:         List
  FlatMapList:  FlatMapList
  GroupList:    GroupList
  TakeList:     TakeList

exports = [
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

exports.forEach ( fn ) -> AbstractList::[fn] = -> Sonic[fn](@, arguments...)

`
export default Sonic
`
