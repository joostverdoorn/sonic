describe "RangeList", ->

  it "it should work", ->
    @list = Sonic([0...10])
    @range = @list.range(3,5)
    expect(@range.toArray()).toEqual([3, 4, 5, 6, 7])
    expect(@range.toArray()).toEqual([3, 4, 5, 6, 7])
    expect(@range.toArray()).toEqual([3, 4, 5, 6, 7])

  describe "#get", ->

  describe "#has", ->

  describe "#prev", ->

  describe "#next", ->

  describe "#_onSourceInvalidate", ->

  describe "#_onStartInvalidate", ->

  describe "#_onCountInvalidate", ->

  describe "#_invalidate", ->
