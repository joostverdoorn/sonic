class SortedList extends TailingList

  Entry: SortedEntry

  HeadEntry: -> new @Entry @source.headEntry, list: @, sortVal: -Infinity
  TailEntry: -> new @Entry @source.tailEntry, list: @, sortVal:  Infinity

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

        unless @_bySourceId[sourceEntry.id]
          @createBySource(sourceEntry, silent: true)

      return @_evaluated = true
    return false

  createBySource: (sourceEntry, options = {}) ->
    entry = super sourceEntry, options
    @headEntry.node.insert(entry.node)
    return entry
