class SortedList extends TailingList

  Entry: SortedEntry

  HeadEntry : () -> new @Entry @source.headEntry, list: @, sortVal: -Infinity
  TailEntry : () -> new @Entry @source.tailEntry, list: @, sortVal:  Infinity

  constructor: ( source, options = {} ) ->
    @rootNode = new TreeNode(0)
    @sortFn = options.sortFn
    @_evaluated = false

    super source, options

    @headEntry.node.insert(@tailEntry.node)
    @evaluate()

  evaluate: ( ) ->
    unless @_evaluated
      iterator = @source.getIterator()

      while iterator.moveNext()
        sourceEntry = iterator.entry
        unless @_bySourceId[sourceEntry]
          @createBySource(sourceEntry, silent: true)

      return @_evaluated = true
    return false

  createBySource: (sourceEntry, options = {}) ->
    entry = super sourceEntry, options
    @headEntry.node.insert(entry.node)




  # before: ( id ) ->
  #   @_evaluate() unless @_evaluated
  #   super id

  # after: ( id ) ->
  #   @_evaluate() unless @_evaluated
  #   super id

  # move: ( id, options = {} ) ->


  # _sort: ( headEntry = @headEntry, length = @length ) ->

  #   half = Math.ceil(length / 2)
  #   midId = @idAt(half)

  #   @_merge(@_sort(left, half), @_sort(right, length - half))


  # _merge: ( headEntry, length ) ->






  # # _split: ( headEntry = @headEntry, length = @length ) ->
  # #   i = 0
  # #   middleId = headEntry
  # #   while i++ <=
  # #     middleId = @_after[middleId]

  # #   return middleId



  # _evaluate: ( ) ->
  #   @_evaluated = true
  #   iterator = @source.getIterator()

  #   while iterator.moveNext()
  #     sourceId = iterator.id
  #     id = @insert iterator.current(), before: @tailEntry

  #     @_sourceIdById[id] = sourceId
  #     @_idBySourceId[sourceId] = id

  #   # @mergeSort()






