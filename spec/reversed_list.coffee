describe "ReversedList", ->

  beforeEach ->
    @list = Sonic.create([1,2,3,4,5])
    @reversedList = @list.reverse()

  it "should reverse the given list", ->
    expect(@reversedList.toArray()).toEqual([5,4,3,2,1])

  it "should respond to creations", ->
    @list.push(6)

    expect(@reversedList.toArray()).toEqual([6,5,4,3,2,1])
