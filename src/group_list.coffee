`
import FlatMapList from './flat_map_list'
import Unit        from './unit'
`

class GroupList extends FlatMapList

  constructor: ( source, groupFn ) ->

    @_byValue = new Map
    @_groupFn = groupFn or ( x ) -> x

    flatMapFn = ( value ) ->
      groupValue = @_groupFn(value)
      return new Unit() if @_byValue.has(groupValue)

      list = @_source.filter ( value ) => @_groupFn(value) is groupValue
      @_byValue.set(groupValue, list)
      return new Unit(list)

    super(source, flatMapFn)

`
export default GroupList
`
