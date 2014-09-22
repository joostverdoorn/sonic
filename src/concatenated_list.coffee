class ConcatenatedList extends AbstractList

  constructor: ( sources ) ->
    @_sources = Sonic.create(sources)

    @built = false
    super

  length: ( ) ->
    @build() unless @built
    return super

  get: ( id ) ->
    for source in @sources
      if item = source.get(id)
        @items[id] = item
        return item

    return undefined

  idAt: ( index ) ->
    @build() unless @built
    return super

  build: ( ) ->
    for source in @sources
      for index in [0 ... source.length()]
        id    = source.idAt(index)
        item  = source.get(id)

        @items[id] = item
        @ids.push(id)
    @built = true



