require('es6-collections')

FlatMapList = require('./flat_map_list')
Unit        = require('./unit')

class GroupList extends FlatMapList

  constructor: ( source, groupFn ) ->

    console.log JSON.stringify Object.keys(Map)
    @_byValue = new Map
    @_groupFn = groupFn or ( x ) -> x

    flatMapFn = ( value ) ->
      groupValue = @_groupFn(value)
      return new Unit() if @_byValue.has(groupValue)

      list = @_source.filter ( value ) => @_groupFn(value) is groupValue
      @_byValue.set(groupValue, list)
      return new Unit(list)

    super(source, flatMapFn)


module.exports = GroupList

