class SortedList extends TransformedList

  constructor: ( source, options ) ->

    super source
    @_sortFn = options.sortFn
    @_nodeBySignalId = {}

    @_root = new Node(@_sentinel, value: -Infinity)
    # @_root.left = @_root

    @_nodeBySignalId[@_sentinel.id] = @_root

    iterator = @_source.getIterator()
    @_create(iterator.signal, silent: true) while iterator.moveNext()

  _transformer : ( source, signal ) =>
    # if @_sortFn?
    value = @_sortFn(source.value())

    if not @_nodeBySignalId[source.id]?
      node = new Node(source, value: value)
      @_nodeBySignalId[source.id] = node
      @_root.insert(node)

    else if @_nodeBySignalId[source.id].value isnt value
      @_root.remove(@_nodeBySignalId[source.id])

      node = new Node(source, value: value)
      @_nodeBySignalId[source.id] = node

      @_root.insert(node)

    return source

  before: ( signal = @_sentinel ) ->
    node = @_nodeBySignalId[signal.id]

    if node is @_root
      before = @_root.rightMost()

    else if left = node.left
      before = left.rightMost()

    else if parentNode = node.parent
      if parentNode.isRight()
        before = parentNode

      else
        value = before.value
        while parentNode and parentNode.value > value
          parentNode = parentNode.parent
        before = parentNode

    return before.signal if before?


  after: ( signal = @_sentinel ) ->
    node = @_nodeBySignalId[signal.id]
    if right = node.right
      after = right.leftMost()

    else if parentNode = node.parent
      if parentNode.isLeft()
        after = parentNode

      else
        value = node.value
        while parentNode and parentNode.value <= value
          parentNode = parentNode.parent
        after = parentNode

    return after.signal if after?

  # before: ( signal = @_sentinel ) ->
  #   before = super(signal)
  #   if before isnt undefined
  #     return before

  #   source = @_sourceById[signal.id]
  #   until before or not source = @_source.before(source)
  #     before = @_transformer(source)

  #   unless before and source
  #     return null

  #   @_add(before, source, before: signal, silent: true)
  #   return before

  # after: ( signal = @_sentinel ) ->
  #   after = super(signal)
  #   if after isnt undefined
  #     return after

  #   source = @_sourceById[signal.id]
  #   until after or not source = @_source.after(source)
  #     after = @_transformer(source)

  #   unless after and source
  #     return null

  #   @_add(after, source, after: signal, silent: true)
  #   return after

