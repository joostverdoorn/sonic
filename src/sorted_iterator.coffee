# class SortedIterator extends TailingIterator

#   moveNext: ( ) ->
#     if right = @entry.right
#       @entry = right.leftMost()
#       return @entry isnt @list.tailEntry

#     else if parentNode = @entry.parent
#       if @entry.isLeft()
#         @entry = parentNode
#         return @entry isnt @list.tailEntry

#       else
#         sortValue = @entry.sortValue()
#         while parentNode and parentNode.sortValue() <= sortValue
#           parentNode = parentNode.parent
#         @entry = parentNode
#         return @entry isnt @list.tailEntry

#     return false

#   movePrevious: ( ) ->
#     if left = @entry.left
#       @entry = left.rightMost()
#       return true

#     else if parentNode = @entry.parent
#       if @entry.isRight()
#         @entry = parentNode
#         return true

#       else
#         sortValue = @entry.sortValue()
#         while parentNode and parentNode.sortValue() > sortValue
#           parentNode = parentNode.parent
#         @entry = parentNode
#         return true

#     return false
