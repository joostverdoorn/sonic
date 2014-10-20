class FilteredList extends TailingList

  Iterator: FilteredIterator

  constructor: ( source, options ) ->
    @filterFn = options.filterFn
    super source, options
