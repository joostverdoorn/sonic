Sonic =
  # _uniqueCounter: 0

  create: ( items = [] ) ->
    if items instanceof AbstractList
      return items
    return new SimpleList(items)

  # uniqueId: ( ) ->
  #   uniqueId = Sonic._uniqueCounter
  #   Sonic._uniqueCounter++

  #   # We use string ids because the ids will be used as object keys. This way we
  #   # can guarentee consistency for lookups.
  #   return uniqueId.toString()
