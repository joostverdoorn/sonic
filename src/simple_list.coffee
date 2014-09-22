class SimpleList extends AbstractList

  constructor: ( items ) ->
    super

    previous = @headId

    if items?
      for item in items
        id = @_uniqueId()
        @_byId[id] = item

        if previous?
          @_after[previous] = id
          @_before[id] = previous
        previous = id
      length = items.length

    @_after[previous] = @tailId
    @_before[@tailId] = previous

  push: ( item, options = {} ) ->
    options.before = @tailId
    return @insert(item, options)

  add:  ( item, options = {} ) ->
    return @push(item, options)

  unshift: ( item, options = {}) ->
    options.after = @headId
    return @insert(item, options)

  pop: ( options ) ->
    id = @before @tailId
    item = @_byId[id]
    @delete id, options
    return item

  shift: ( options ) ->
    id = @after @headId
    item = @_byId[id]
    @delete id, options
    return item
