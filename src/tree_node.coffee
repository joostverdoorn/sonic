class TreeNode

  constructor: ( value, options = {} ) ->
    @entry = options.entry
    @value = value

    @left = null
    @right = null
    @parent = null

    leftSize = undefined
    rightSize = undefined

  size: ( ) ->
    @leftSize ?= @left?.size() or 0
    @rightSize ?= @right?.size() or 0
    return @leftSize + @rightSize + 1

  depth: ( ) ->
    return Math.ceil(1 + Math.log(@size()) / Math.LN2)

  isRoot: ( ) ->
    return not @parent

  isLeaf: ( ) ->
    return not @left and not @right

  leftMost: ( ) ->
    if left = @left
      return left.leftMost()
    return @

  rightMost: ( ) ->
    if right = @right
      return right.rightMost()
    return @

  isLeft: ( ) ->
    if parent = @parent
      return @ is parent.left
    return false

  isRight: ( ) ->
    if parent = @parent
      return @ is parent.right
    return false

  detach: ( ) ->
    return null unless parent = @parent

    if @isLeft()
      @parent.detachLeft()
    else @parent.detachRight()

    return parent

  detachLeft: ( ) ->
    return null unless left = @left

    left.parent = null
    @left = null

    @leftSize = 0
    return left

  detachRight: ( ) ->
    return null unless right = @right

    @right.parent = null
    @right = null

    @rightSize = 0
    return right

  attach: ( node ) ->
    return false unless node

    if node.value < @value
      return @attachLeft(node)
    else return @attachRight(node)

  attachLeft: ( node ) ->
    @left.parent = null if @left

    if node
      node.detach()
      node.parent = @
    @left = node

    @leftSize = undefined
    return true

  attachRight: ( node ) ->
    @right.parent = null if @right

    if node
      node.detach()
      node.parent = @
    @right = node

    @rightSize = undefined
    return true

  remove: ( ) ->
    left = @left
    right = @right
    parent = @parent

    @detach()
    @detachLeft()
    @detachRight()

    if left
      pivot = left.rightMost()
      pivot.parent.attachRight(pivot.left)
    else if right
      pivot = right.leftMost()
      pivot.parent.attachLeft(pivot.right)
    else return

    pivot.attach(left)
    pivot.attach(right)
    parent.attach(pivot)

    pivot.balance()
    return true

  insert: ( node ) ->
    value = @value
    otherValue = node.value

    left = @left
    right = @right
    parent = @parent

    switch
      # Set the node as our parent
      when otherValue is value
        @detach()
        @detachLeft()

        node.attach(@)
        node.attach(left) if left
        parent.attach(node)

      # Set the node as our left
      when otherValue < value
        if left
          left.insert(node)
          @leftSize = undefined
        else @attachLeft(node)

      # Set the node as our right
      when otherValue > value
        if right
          right.insert(node)
          @rightSize = undefined
        else @attachRight(node)

    @balance()
    return true

  balance: ( ) ->
    return if @isRoot()

    balance = (@right?.depth() or 0) - (@left?.depth() or 0)

    if balance <= -2
      @rotateRight()
      return true
    else if balance >= 2
      @rotateLeft()
      return true

    return false

  rotateLeft: ( ) ->
    pivot = @right
    return false if pivot.value <= @value

    pivot.rotateRight() if pivot.balance() is -1
    pivot = @right
    parent = @parent

    @attachRight(pivot.left)
    pivot.attachLeft(@)
    parent.attach(pivot)
    return true

  rotateRight: ( ) ->
    pivot = @left
    return false if pivot.value > @value

    pivot.rotateLeft() if pivot.balance() is 1
    pivot = @left
    parent = @parent

    @attachLeft(pivot.right)
    pivot.attachRight(@)
    parent.attach(pivot)
    return true
