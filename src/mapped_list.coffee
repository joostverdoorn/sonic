class MappedList extends TailingList

  Entry: MappedEntry

  constructor: ( source, options = {} ) ->
    super source, options
    @mapFn = options.mapFn
