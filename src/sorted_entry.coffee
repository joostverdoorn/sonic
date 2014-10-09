class SortedEntry extends TailingEntry

  constructor: ( source, options = {} ) ->
    super source, options

    if options.sortVal?
      sortVal = options.sortVal
    else sortVal = @list.sortFn(@value())

    @node = new TreeNode(sortVal, entry: @)
    # @list.headEntry.node.insert(@node) unless @value() is -Infinity


  next: ( ) ->
    # # Stop when whe reach the tailEntry
    # return null if @ is @list.tailEntry

    # If whe are somewhere, the next greatest thing will be our on our right
    if right = @node.right()
      return right.leftMost().entry # And it will be the smallest thing on the right

    else if parentNode = @node.parent() # If we don't have a right subtree, the next greatest thing is connected to our parent

      if @node.isLeft() # If we are smaller, then it is our parent
        return parentNode.entry
      else # If we are bigger
        while parentNode and parentNode.value() <= @node.value()
          parentNode = parentNode.parent() # Find the next biggest thing
        return parentNode.entry

    else return null

  previous: ( ) ->
    # return null if @ is @list.headEntry

    if left = @node.left()
      return left.rightMost().entry

    else if parentNode = @node.parent()

      if @node.isRight()
        return parentNode.entry
      else
        while parentNode and parentNode.value() > @node.value()
          parentNode = parentNode.parent()
        return parentNode.entry
    else return null

