class UniqueList extends AbstractList

  constructor: ( @source ) ->
    @built = false
    super

  length: ( ) ->
    @build() if not @built
    return super

  get: ( id ) ->
    item = @source.get(id)
    return item

  idAt: ( index ) ->
    @build() if not @built
    return super

  # TODO: There must be an alternative to this. This has O(n^2) worst case
  # performance, too much for my taste.
  build: ( ) ->
    for index in [0 ... @source.length()]
      sourceId = @source.idAt(index)
      item = @source.get(sourceId)

      found = false
      for id in @ids
        if @items[id] is item
          found = true
          break

      unless found
        @items[sourceId] = item
        @ids.push(sourceId)
