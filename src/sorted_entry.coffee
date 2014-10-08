class SortedEntry extends TailingEntry

  constructor: ( source, options = {} ) ->
    super source, options

    sortVal = options.sortVal or @list.sortFn(@value())

    @node = new TreeNode(sortVal, entry: @)
    @list.rootNode.insert(@node)


  next: ( ) ->
    return null if @ is @list.tailEntry

    if right = @node.right()
      return right.leftMost().entry

    else if parentNode = @node.parent()

      if @node.isLeft()
        return parentNode.entry
      else
        while parentNode and parentNode.value() < @node.value()
          parentNode = parentNode.parent()
        return parentNode.entry

    else return null

  previous: ( ) ->
    return null if @ is @list.headEntry

    if left = @node.left()
      return left.rightMost().entry

    else if parentNode = @node.parent()

      if @node.isRight()
        return parentNode.entry
      else
        while parentNode and parentNode.value() >= @node.value()
          parentNode = parentNode.parent()
        return parentNode.entry
    else return null

