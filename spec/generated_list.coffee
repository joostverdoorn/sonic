# describe "GeneratedList", ->
#   beforeEach ->
#     @fn = (list) ->
#       # console.log list.last() + 1
#       list.last() + 1
#     @g = new Sonic.GeneratedList @fn, init: [0]
#     @gen = @g.getIterator()
#     @gen.moveNext()

#   it "should work", ->
#     i = 0
#     while ++i < 10
#       @gen.moveNext()
#       # console.log @gen.entry.value()
#       # i++
#     console.log @g.toArray()



