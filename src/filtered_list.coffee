class FilteredList extends TailingList

  Entry: FilteredEntry

  constructor: ( source, options ) ->
    super source, options
    @filterFn = options.filterFn
