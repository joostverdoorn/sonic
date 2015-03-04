`
import Signal from './signal'
import Iterator from './iterator'
import AbstractList from './abstract_list'
import List from './list'
import Unit from './unit'
import FlatMapList from './flat_map_list'
import GroupList from './group_list'
`

Sonic =

  _uniqueCounter: 1

  create: ( items = [] ) ->
    if items instanceof AbstractList
      return items
    return new List(items)

  unit: ( item ) ->
    return new Unit(item)

  empty: ( ) ->
    return new Unit()

  uniqueId: ( ) ->
    return Sonic._uniqueCounter++

  flatMap: ( list, flatMapFn ) ->
    return new FlatMapList(list, flatMapFn)

  map: ( list, mapFn ) ->
    return list.flatMap( ( value ) -> new Unit(mapFn(value)))

  filter: ( list, filterFn ) ->
    return list.flatMap( ( value ) -> if filterFn(value) then new Unit(value) else new Unit())

  group: ( list, groupFn ) ->
    return new GroupList(list, groupFn)

  sort: ( list, sortFn ) ->
    return new SortedList(list, sortFn: sortFn)

  concat: ( list, others... ) ->
    return new FlatMapList([list].concat(others), ( list ) -> list)

  flatten: ( list ) ->
    return list.flatMap( ( list ) -> list )

  reverse: ( list ) ->
    return new ReversedList(list)

  unique: ( list ) ->
    return list.uniq()

  uniq:   ( list, groupFn = ( x ) -> x ) ->
    return list.group(groupFn).flatMap(( list ) -> new Unit(list.first()))

  union: ( list, others... ) ->
    return list.concat(others...).uniq()

  intersection: ( list, other ) ->
    return list.filter(other.contains)

  take: ( list, count ) ->
    return new TakeList(list, count)

  Signal:       Signal
  Iterator:     Iterator
  AbstractList: AbstractList
  Unit:         Unit
  List:         List
  FlatMapList:  FlatMapList
  GroupList:    GroupList

exports = [
  'flatMap', 'map', 'filter', 'group', 'sort', 'concat', 'flatten', 'reverse', 'unique',
  'uniq', 'union', 'intersection', 'take'
]

exports.forEach ( fn ) -> AbstractList::[fn] = -> Sonic[fn](@, arguments...)



`
export default Sonic
`
