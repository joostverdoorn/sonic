utilities = require('./utilities')

# Creates a list from an array
#
# @param [Array, AbstractList] items The initial values for the list
# @return [List] The list containing the given values
#
Sonic = -> Sonic.factory(arguments...)

# Creates a new Unit containing the given item
#
# @param [any] item The value for the Unit
# @return [Unit] The Unit with the given item
#
Sonic.unit = ( item ) ->
  return new Sonic.Unit(item)

# Creates an empty Unit
#
# @return [Unit] An empty Unit
#
Sonic.empty = ( ) ->
  return new Sonic.Unit()

for key, value of utilities
  do (key, value) =>
    if value instanceof Function
      Sonic[key] = ( list, args... ) -> value.apply(Sonic.factory(list), args)
    else Sonic[key] = value

Sonic.uniqueId     = require('./unique_id')
Sonic.factory      = require('./factory')
Sonic.Iterator     = require('./iterator')
Sonic.AbstractList = require('./abstract_list')
Sonic.List         = require('./list')
Sonic.Unit         = require('./unit')
Sonic.FlatMapList  = require('./flat_map_list')
Sonic.GroupList    = require('./group_list')
Sonic.RangeList    = require('./range_list')

module.exports = Sonic
