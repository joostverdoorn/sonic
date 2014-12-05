class UniqueList extends TransformedList

  constructor: ( source ) ->
    @_duplicates = source.duplicates()
    console.log @_duplicates.toArray()

    iterated = []
    duplicates = []
    iterator = @getIterator()
    while iterator.moveNext()
      value = iterator.current()
      if value in iterated
        duplicates.push(value)
      else iterated.push(value)

    return Sonic.create duplicates

    filterFn = ( value ) => not @_duplicates.contains(value)
    super source, filterFn: filterFn
