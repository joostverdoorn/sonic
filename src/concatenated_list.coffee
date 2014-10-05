class ConcatenatedList extends TailingList

  Entry: ConcatenatedEntry

  constructor: ( sources, options = {} ) ->
    @sources = Sonic.create(sources)

    source =
      headEntry: @sources.first().headEntry
      tailEntry: @sources.last().tailEntry

    super source, options
