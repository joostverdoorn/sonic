describe "RangeList", ->

  it "it should work", ->
    @list = Sonic([0...10])
    @range = @list.range(3,5)
    expect(@range.toArray()).toEqual([3, 4, 5, 6, 7])
