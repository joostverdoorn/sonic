class SortedEntry extends TailingEntry

  constructor: ( source, options = {} ) ->
    super source, options

    if options.sortVal?
      sortVal = options.sortVal
    else sortVal = @list.sortFn(@value())

    @node = new TreeNode(sortVal, entry: @)

  next: ( ) ->
    if right = @node.right
      return right.leftMost().entry

    else if parentNode = @node.parent

      if @node.isLeft()
        return parentNode.entry

      else
        while parentNode and parentNode.value <= @node.value
          parentNode = parentNode.parent
        return parentNode.entry

    else return null

  previous: ( ) ->
    if left = @node.left
      return left.rightMost().entry

    else if parentNode = @node.parent

      if @node.isRight()
        return parentNode.entry

      else
        while parentNode and parentNode.value > @node.value
          parentNode = parentNode.parent
        return parentNode.entry

    else return null

