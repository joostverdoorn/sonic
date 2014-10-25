class MappedList extends TailingList

  Entry: MappedEntry

  constructor: ( source, options = {} ) ->
    @mapFn = options.mapFn
    super source, options
