# class Tree

#   constructor: ( options = {} ) ->
#     @depth = 0
#     @rootNode = new TreeNode(-Infinity)


#   insert: ( value ) ->
#     node = new TreeNode(value)



#   findPosition: ( value , start = @rootNode) ->
#     left = start.left()

#     if value < start.value()
#       if left
#         @findPosition(value, left)
#       else start
#     else
#       right = start.right()
#       if right
#         @findPosition(value, right)
#       else start


#   insert: ( node ) ->
#     @rootNode.insert(node)

#   # move: ( target, destination ) ->
#   #   oldParent = target.parent()
#   #   if target is oldParent.left()
#   #     oldParent.setLeft(null)
#   #   else oldParent.setRight(null)

#   #   target.setParent(destination)



#   toJSON: ( ) ->
#     return @rootNode.toJSON()




