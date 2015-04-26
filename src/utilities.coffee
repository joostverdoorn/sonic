module.exports =

  # Creates an iterator over the given array or list
  #
  # @param[Array,AbstractList] list The array or list to iterate
  # @param[Number] listst The id of the item to listst at. Can be omitted to listst at the first item
  # @return [Iterator] A new iterator that iterates the given array or list
  #
  getIterator: ( start ) ->
    Iterator = require('./iterator')
    return new Iterator(@, start)

  # Alias for `forEach`
  #
  # @param [Function] fn The function to execute on each iteration. If the function call returns false explicitly, iteration will be interupted at that point.
  # @return [Boolean] true if all the function executions return true, false otherwise.
  #
  each: ( fn, prev, next ) ->
    return @forEach(fn, prev, next)

  # Iterates over a array or list and executes a function with the value and id of the item at each position
  #
  # @param [Function] fn The function to execute on each iteration. If the function call returns false explicitly, iteration will be interupted at that point.
  # @return [Boolean] true if all the function executions return true, false otherwise.
  #
  forEach: ( fn, prev, next ) ->
    id = prev
    while (id = @next(id))?
      break if id is next
      return false if fn(@get(id), id) is false
    return true

  # Executes a function on each item and returns the id of the first item for which the function returns a truthy value
  #
  # @param [Function] fn The function to execute on each item
  # @return [Number] The id of the first matching item. Returns undefined if no item matches
  #
  findId: ( fn ) ->
    result = undefined

    @forEach ( value, id ) ->
      if fn(value)
        result = id
        return false

    return result

  # Executes a function on each item and returns the value of the first item for which the function returns a truthy value
  #
  # @param [Function] fn The function to execute on each item
  # @return [any] The value of the first matching item. Returns undefined if no item matches
  #
  find: ( fn ) ->
    return @get(@findId(fn))

  # Returns the id of the item in the given array or list at the given index
  #
  # @param [Number] index The index to match
  # @return [Number] The id of the item at the given index. Returns undefined if there is no item at the index
  #
  idAt: ( index ) ->
    i = 0
    return @findId(-> if i++ is index then true)

  # Returns the id of the first item in the given array or list that equals the given value
  #
  # @param [Number] value The value to match
  # @return [Number] The id of the item with the given value. Returns undefined if there is no item that matches the value
  #
  idOf: ( value ) ->
    return @findId(( v ) -> v is value )

  # Returns the value of the item in the given array or list at the given index
  #
  # @param [Number] index The index to match
  # @return [any] The value of the item at the given index. Returns undefined if there is no item at the index
  #
  at: ( index ) ->
    return @get(@idAt(index))

  # Returns the index of the first item in the given array or list that matches the given value
  #
  # @param [any] value The value to match
  # @return [Number] The index of the first item that matches the given value. Returns -1 if there is no item that matches the value
  #
  indexOf: ( value ) ->
    i = -1
    return i if @some(( v ) -> i++; v is value)
    return -1

  # Tests if there is some item in the given array or list for which the given predicate holds
  #
  # @param [Function] predicate The predicate to test
  # @return [Boolean] True if the predicate holds for any item, false otherwise
  #
  some: ( predicate ) ->
    return not @each(-> not predicate(arguments...) )

  # Alias for `some`
  #
  # @param [Function] predicate The predicate to test
  # @return [Boolean] True if the predicate holds for any item, false otherwise
  #
  any: ( predicate ) ->
    return @some(predicate)

  # Tests if there is some item in the given array or list with the given value
  #
  # @param [Function] predicate The predicate to test
  # @return [Boolean] True if the predicate holds for any item, false otherwise
  #
  contains: ( value ) ->
    return @some(( v ) -> v is value)

  first: ( ) ->
    return @get(@next())

  last: ( ) ->
    return @get(@prev())

  reduce: ( reduceFn, memo ) ->
    @each(( value, id ) -> reduceFn(memo, value, id))
    return memo

  flatMap: ( flatMapFn ) ->
    FlatMapList = require('./flat_map_list')
    return new FlatMapList(@, flatMapFn)

  group: ( groupFn ) ->
    GroupList = require('./group_list')
    return new GroupList(@, groupFn)

  # sort: ( sortFn ) ->
  #   SortedList = require('./sorted_list')
  #   return new SortedList(@, sortFn: sortFn)

  range: ( start, count ) ->
    RangeList = require('./range_list')
    return new RangeList(@, start, count)

  take: ( count ) ->
    return @range(0, count)

  map: ( mapFn ) ->
    factory = require('./factory')
    Unit = require('./unit')
    flatMapFn = factory(mapFn).flatMap((mapFn) -> new Unit((value, id) -> new Unit(mapFn(value, id))))
    return @flatMap(flatMapFn)

  pluck: ( key ) ->
    factory = require('./factory')
    mapFn = factory(key).map((key) -> ((value) -> value[key]))
    return @map(mapFn)

  invoke: ( key, args... ) ->
    factory = require('./factory')
    mapFn = factory(key).map((key) -> ((value) -> value[key](args...)))
    return @map(mapFn)

  filter: ( filterFn ) ->
    factory = require('./factory')
    Unit = require('./unit')
    flatMapFn = factory(filterFn).map((filterFn) -> ((value, id) -> filterFn(value, id) and new Unit(value) or new Unit()))
    return @flatMap(flatMapFn)

  append: ( lists ) ->
    factory = require('./factory')
    Unit = require('./unit')
    return factory([new Unit(@), factory(lists)]).flatten().flatten()

  concat: ( lists... ) ->
    return @append(lists)

  flatten: ( ) ->
    return @flatMap((list) -> list)

  uniq: ( groupFn = (x) -> x ) ->
    return @group(groupFn).flatMap((list) -> list.take(1))

  union: ( lists ) ->
    return @concat(lists).uniq()

  intersection: ( other ) ->
    return @filter(other.contains)

  proxy: ( fns = { 'get', 'has', 'prev', 'next', 'onInvalidate' } ) ->
    AbstractList = require('./abstract_list')
    proxy = new AbstractList
    proxy[key] = @[fn].bind(@) for key, fn of fns
    return proxy

  reverse: ( ) ->
    fns = { 'get', 'has', 'prev': 'next', 'next': 'prev' }
    proxy = @proxy(fns)

    proxy.onInvalidate = ( callback ) =>
      @onInvalidate ( prev, next ) ->
        callback(next, prev)

    return proxy

  indexBy: ( indexFn ) ->
    indexFn ||= require('./unique_id')

    list = @
    idBySourceId = {}
    sourceIdById = {}

    return Sonic({
      has: ( id ) -> list.has(sourceIdById[id])
      get: ( id ) -> list.get(sourceIdById[id])

      prev: ( id ) ->
        prev = list.prev(sourceIdById[id])
        return prev unless prev?

        unless (id = idBySourceId[prev])?
          id = indexFn(list.get(prev))
          idBySourceId[prev] = id
          sourceIdById[id] = prev
        return id

      next: ( id ) ->
        next = list.next(sourceIdById[id])
        return next unless next?

        unless (id = idBySourceId[next])?
          id = indexFn(list.get(next))
          idBySourceId[next] = id
          sourceIdById[id] = next
        return id

      onInvalidate: ( fn ) ->
        return list.onInvalidate ( prev, next ) ->
          fn(idBySourceId[prev], idBySourceId[next])

      removeListener: ( handlerId ) ->
        return list.removeListener(handlerId)
    })

  zoom: ( id ) ->
    @filter((value, _id) -> id is _id)

  toArray: ( ) ->
    @reduce((( memo, value ) -> memo.push(value)), [])

