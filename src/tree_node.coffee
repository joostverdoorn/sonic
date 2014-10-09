class TreeNode

  constructor: ( value, options = {} ) ->
    @_value = value
    @_parent = options.parent
    @entry = options.entry
    @balanced = true

  size: ( ) ->
    @leftSize() + @rightSize() + 1

  leftSize: () ->
    @left()?.size() or 0

  rightSize: () ->
    @right()?.size() or 0

  depth: ( ) ->
    Math.ceil(1 + Math.log(@size()) / Math.LN2)

  balance: ( ) ->
    (@right()?.depth() or 0) - (@left()?.depth() or 0)

  value: ( ) ->
    return @_value

  setParent: ( node ) ->
    @_parent = node

  setLeft: ( node ) ->
    @_left = node

  setRight: ( node ) ->
    @_right = node

  parent: ( ) ->
    return @_parent

  left: ( ) ->
    return @_left

  leftMost: ( ) ->
    if left = @left()
      return left.leftMost()
    return @

  isLeft: ( ) ->
    unless @isRoot()
      return @ is @parent().left()
    return false

  detachLeft: ( ) ->
    @_left?.setParent null
    @_left = null

  right: ( ) ->
    return @_right

  rightMost: ( ) ->
    if right = @right()
      return right.rightMost()
    return @

  isRight: ( ) ->
    unless @isRoot()
      return @ is @parent().right()
    return false

  detachRight: ( ) ->
    @_right?.setParent null
    @_right = null

  detach: ( ) ->
    unless @isRoot()
      if @isLeft()
        @parent().detachLeft()
      else @parent().detachRight()

  isRoot: ( ) ->
    return not @parent()

  isLeaf: ( ) ->
    not @left() and not @right()

  attach: ( node ) ->
    unless node
      console.log "Attach break"
      return
    node.setParent @
    if node.value() < @value()
      @setLeft node
      # console.log "Attaching", node.value(), "left of", @value()
    else
      @setRight node
      # console.log "Attaching", node.value(), "right of", @value()

  insert: ( node ) ->
    # console.log 'insert', node.value(), 'in', @value()

    # If the node belongs on our left
    if node.value() < @value()
      if left = @left()
        # And we have a left subtree, delegate the insertion
          left.insert(node)
      else
        # Remove the node from it's old parent and attach it to us
        @attach(node)
    else if node.value() >= @value() # Node belongs on our right
      if right = @right()
        # If we have a right subtree, delegate the insertion
        right.insert(node)
      else
        # Remove the node from it's old parent and attach it to us
        @attach(node)

    # console.log 'balance in', @value(), 'is', @balance()
    # And end with a balancing step
    return unless @balanced
    unless @isRoot()
      if @balance() is -2
        @rotateRight()
      else if @balance() is 2
        @rotateLeft()

  rotateLeft: ( ) ->
    # return unless pivot

    # console.log 'rotate left', @value()
    # If the pivot already has a child where we want to be, rotate it first
    # if pivot.left()
    #   pivot.rotateRight()
    #   pivot = @right() # Our pivot has changed because of the rotation

    # We are rotating left so we want to place our right child in our place and ourself left of it
    pivot = @right()
    return if pivot.value() <= @value()

    pivot.rotateRight() if pivot.balance() is -1
    pivot = @right()
    parent = @parent()

    pivot.detach()

    if left = pivot.left()
      pivot.detachLeft()
      @attach left

    pivot.attach(@)
    parent.attach(pivot)


  rotateRight: ( ) ->
    # return unless pivot
    # We are rotating right so we want to place our left child in our place and ourself right of it

    # console.log 'rotate right', @value()
    # # If the pivot already has a child where we want to be, rotate it first
    # if pivot.right()
    #   pivot.rotateLeft()
    #   pivot = @left() # Our pivot has changed because of the rotation

    # Now we start the rotation by detaching ourself and our pivot

    pivot = @left()
    return if pivot.value() > @value()

    pivot.rotateLeft() if pivot.balance() is 1
    pivot = @left()
    parent = @parent()

    pivot.detach()


    if right = pivot.right()
      pivot.detachRight()
      @attach right

    pivot.attach(@)
    parent.attach(pivot)

  toJSON: ( ) ->
    json = {}
    json[@value()] = [@left()?.toJSON(), @right()?.toJSON()]
    return json

  toString:() ->
    JSON.stringify @


