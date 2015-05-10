# describe "Iterator", ->
#   beforeEach ->
#     n = 10
#     @values = [0...n]
#
#     @list = Sonic(@values)
#     @startId = @list.idOf(5)
#     @iterator = new Sonic.Iterator(@list, @startId)
#
#   describe "constructor", ->
#
#     it "should create a new instance of Iterator with the given list and startId", ->
#
#       expect(@iterator instanceof Sonic.Iterator).toBe(true)
#       expect(@iterator.list).toBe(@list)
#       expect(@iterator.startId).toBe(@startId)
#
#     it "should start at the given startId", ->
#       expect(@iterator.currentId).toEqual(@startId)
#
#   describe "current", ->
#     it "should return the value of the item with id currentId", ->
#       expect(@iterator.current()).toBe(@list.get(@iterator.currentId))
#
#   describe "reset", ->
#     beforeEach ->
#       @iterator.moveNext()
#
#     it "should reset the currentId to be the startId", ->
#       expect(@iterator.currentId).not.toBe(@iterator.startId)
#       @iterator.reset()
#       expect(@iterator.currentId).toBe(@iterator.startId)
#
#   describe "moveNext", ->
#     beforeEach ->
#       @done = @iterator.moveNext()
#
#     it "should advance the currentId to the id of the next item", ->
#       expect(@iterator.currentId).toBe(@list.next(@startId))
#
#     it "should return true if the iterator is not done", ->
#       expect(@done).toBe(true)
#
#     it "should return false when the iterator is done", ->
#       res = @iterator.moveNext() for i in [1..4]
#       expect(res).toBe(false)
#
#   describe "movePrevious", ->
#     beforeEach ->
#       @done = @iterator.movePrevious()
#
#     it "should reverse the currentId to the id of the previous item", ->
#       expect(@iterator.currentId).toBe(@list.prev(@startId))
#
#     it "should return true if the iterator is not done", ->
#       expect(@done).toBe(true)
#
#     it "should return false when the iterator is done", ->
#       res = @iterator.movePrevious() for i in [1..5]
#       expect(res).toBe(false)
#
#   describe "next", ->
#     beforeEach ->
#       @done = @iterator.moveNext() for i in [1..3]
#
#     it "should only move forward if possible", ->
#       res = @iterator.next()
#       expect(res).toEqual({value: 9, done: false, id: @list.idOf(9)})
#
#       res = @iterator.next()
#       expect(res).toEqual({done: true, id: null})
#
#   describe "previous", ->
#     beforeEach ->
#       @done = @iterator.movePrevious() for i in [1..4]
#
#     it "should only move backward if possible", ->
#       res = @iterator.previous()
#       expect(res).toEqual({value: 0, done: false, id: @list.idOf(0)})
#
#       res = @iterator.previous()
#       expect(res).toEqual({done: true, id: null})
#
