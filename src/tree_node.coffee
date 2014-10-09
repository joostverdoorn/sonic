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
    Math.ceil(1 + Math.log(@size()) / Math.LN2)

  isRoot: ( ) ->
    return not @parent

  isLeaf: ( ) ->
    not @left and not @right

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
    if @isLeft()
      @parent.detachLeft()
    else if @isRight()
      @parent.detachRight()

  detachLeft: ( ) ->
    return unless @left
    @left.parent = null
    @left = null

    @leftSize = 0

  detachRight: ( ) ->
    return unless @right
    @right.parent = null
    @right = null

    @rightSize = 0

  attach: ( node ) ->
    return unless node
    if node.value < @value
      @attachLeft(node)
    else @attachRight(node)

  attachLeft: ( node ) ->
    @left.parent = null if @left

    if node
      node.detach()
      node.parent = @
    @left = node

    @leftSize = undefined

  attachRight: ( node ) ->
    @right.parent = null if @right

    if node
      node.detach()
      node.parent = @
    @right = node

    @rightSize = undefined

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

  balance: ( ) ->
    return if @isRoot()

    balance = (@right?.depth() or 0) - (@left?.depth() or 0)

    if balance <= -2
      @rotateRight()
    else if balance >= 2
      @rotateLeft()

  rotateLeft: ( ) ->
    pivot = @right
    return if pivot.value <= @value

    pivot.rotateRight() if pivot.balance() is -1
    pivot = @right
    parent = @parent

    @attachRight(pivot.left)
    pivot.attachLeft(@)
    parent.attach(pivot)

  rotateRight: ( ) ->
    pivot = @left
    return if pivot.value > @value

    pivot.rotateLeft() if pivot.balance() is 1
    pivot = @left
    parent = @parent

    @attachLeft(pivot.right)
    pivot.attachRight(@)
    parent.attach(pivot)
