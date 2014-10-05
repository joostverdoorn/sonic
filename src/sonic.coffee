Sonic =

  _uniqueCounter: 0

  create: ( items = [] ) ->
    if items instanceof AbstractList
      return items
    return new SimpleList(items)

  uniqueId: ( ) ->
    uniqueId = Sonic._uniqueCounter++
    return uniqueId
