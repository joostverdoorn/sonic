class TreeNode

  constructor: ( value, options = {} ) ->
    @_value = value
    @_parent = options.parent
    @entry = options.entry

    # @_leftSize = 0
    # @_rightSize = 0

  size: ( ) ->
    (@left()?.size() or 0) + (@right()?.size() or 0) + 1

  depth: ( ) ->
    Math.ceil(1 + Math.log(@size()) / Math.LN2)

  balance: ( ) ->
   (@right()?.depth() or 0) - (@left()?.depth() or 0)

  value: ( ) ->
    return @_value

  parent: ( ) ->
    return @_parent

  insert: ( node ) ->
    console.log 'insert', node.value(), 'in', @value()

    if node.value() < @value()
      if left = @left()
        left.insert(node)
      else @setLeft(node)

    else
      if right = @right()
        right.insert(node)
      else @setRight(node)

    console.log 'balance in', @value(), 'is', @balance()
    unless @isRoot()
      if @balance() > 1
        @rotateLeft()
      else if @balance() < -1
        @rotateRight()

  left: ( ) ->
    return @_left

  leftMost: ( ) ->
    if left = @left()
      return left.leftMost()
    return @

  right: ( ) ->
    return @_right

  rightMost: ( ) ->
    if right = @right()
      return right.rightMost()
    return @

  rotateLeft: ( ) ->
    console.log 'rotate left', @value()

    pivot = @right()
    return unless pivot

    parent = @parent()
    isLeft = @isLeft()

    if pivot.left()
      pivot.rotateRight()
      pivot = @right()

    # Pivot.RS = Root
    @setRight(null)
    pivot.setLeft(@)

    # Root = Pivot
    debugger unless parent
    if isLeft
      parent.setLeft(pivot)
    else parent.setRight(pivot)


  rotateRight: ( ) ->
    console.log 'rotate right', @value()

    pivot = @left()
    return unless pivot

    parent = @parent()
    isLeft = @isLeft()

    if pivot.right()
      pivot.rotateLeft()
      pivot = @left()

    # Pivot.RS = Root
    @setLeft(null)
    pivot.setRight(@)

    # Root = Pivot
    debugger unless parent
    if isLeft
      parent.setLeft(pivot)
    else parent.setRight(pivot)

  isRoot: ( ) ->
    return not @parent()

  isLeft: ( ) ->
    if parent = @parent()
      return @ is parent.left()
    return false

  isRight: ( ) ->
    if parent = @parent()
      return @ is parent.right()
    return false

  setParent: ( node ) ->
    console.log 'set', node?.value(), 'parent of', @value()
    unless @isRoot()
      if @isLeft()
        @_parent._left = null
      else @_parent._right = null

    @_parent = node

  setLeft: ( node ) ->
    console.log 'set', node?.value(), 'left of', @value()
    # if @left()
    #   @left().setParent(null)


    if node
      node.setParent(@)

    @_left = node
    # console.log 'balance in', @value(), 'is', @balance()

  setRight: ( node ) ->
    console.log 'set', node?.value(), 'right of', @value()
    # if @right()
    #   @right().setParent(null)


    if node
      node.setParent(@)

    @_right = node
    # console.log 'balance in', @value(), 'is', @balance()

  toJSON: ( ) ->
    json = {}
    json[@value()] = [@left()?.toJSON(), @right()?.toJSON()]
    return json

  toString:() ->
    JSON.stringify @


