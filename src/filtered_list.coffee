class FilteredList extends AbstractList

  constructor: ( @source, @filterFn ) ->
    super

    @_sourceIdById = {}
    @_idBySourceId = {}

    @_sourceIdById[@headId] = @source.headId
    @_sourceIdById[@tailId] = @source.tailId
    @_idBySourceId[@source.headId] = @headId
    @_idBySourceId[@source.tailId] = @tailId

    @source.on 'create', ( sourceId ) =>
      sourceItem = @source.get(sourceId)

      if @filterFn(sourceItem)
        id = @create sourceItem

        @_sourceIdById[id] = sourceId
        @_idBySourceId[sourceId] = id

    @source.on 'delete', ( sourceId ) =>
      id = @_idBySourceId[sourceId]
      if id?
        @delete id

        delete @_idBySourceId[sourceId]
        delete @_sourceIdById[id]

    @source.on 'move', ( sourceId ) =>
      id = @_idBySourceId[sourceId]
      beforeSourceId = @source.before(sourceId)
      afterSourceId = @source.after(sourceId)

      # We have to find the position to move the item to. That means we have to
      # find the items in the source list that are sources of the items in this
      # list. If they are not found, or not connected, there is no need to
      # actually move the item because it will appear in the right position when
      # this list is fully evaluated.
      iterator = @source.getIterator(sourceId)
      while iterator.moveNext()
        afterSourceId = iterator.id
        afterId = @_idBySourceId[afterSourceId]

        if afterId?
          iterator = @source.getIterator(sourceId)
          while iterator.movePrevious()
            beforeSourceId = iterator.id
            beforeId = @_idBySourceId[beforeSourceId]

            if beforeId? and @_before[afterId] is beforeId and @_after[beforeId] is afterId
              @move(id, before: beforeId, after: afterId)
              break
          break

    @source.on 'change', ( sourceId, sourceItem ) =>
      id = @_idBySourceId[sourceId]
      unless id?
        return false

      if @filterFn(sourceItem)
        @set(id, sourceItem)
      else @delete(id)

  before: ( id ) ->
    beforeId = @_before[id]
    return beforeId if beforeId? and beforeId isnt @headId

    sourceId = @_sourceIdById[id]
    iterator = @source.getIterator(sourceId)
    while iterator.movePrevious()
      beforeSourceId = iterator.id
      item = @source.get(beforeSourceId)

      if @filterFn(item)
        beforeId = @insert(item, before: id, silent: true)

        @_sourceIdById[beforeId] = beforeSourceId
        @_idBySourceId[beforeSourceId] = beforeId

        return beforeId

    return undefined

  after: ( id ) ->
    afterId = @_after[id]
    return afterId if afterId? and afterId isnt @tailId

    sourceId = @_sourceIdById[id]
    iterator = @source.getIterator(sourceId)
    while iterator.moveNext()
      afterSourceId = iterator.id
      item = @source.get(afterSourceId)

      if @filterFn(item)
        afterId = @insert(item, after: id, silent: true)

        @_sourceIdById[afterId] = afterSourceId
        @_idBySourceId[afterSourceId] = afterId

        return afterId

    return undefined
