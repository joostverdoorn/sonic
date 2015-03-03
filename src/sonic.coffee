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

