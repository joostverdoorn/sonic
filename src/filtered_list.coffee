class FilteredList extends TailingList

  constructor: ( source, options = {} ) ->
    @filterFn = options.filterFn
    super(source, options)

  _create: ( sourceEntry, options ) ->
    return null unless @filterFn(sourceEntry.value())
    return super(sourceEntry, options)
