class UniqueList extends FilteredList

  constructor: ( source, options = {} ) ->
    options.filterFn = ( value ) => not @contains value
    super source, options
