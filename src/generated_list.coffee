class GeneratedList extends TailingList

  # Entry: TailingEntry
  Iterator: Generator

  constructor: ( fn, options = {} ) ->
    @generatorFn = fn
    source = Sonic.create(options.init)

    super source, options
