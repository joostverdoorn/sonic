describe "TransformedList", ->

  beforeEach ->
    @mapFn = ( x ) -> x * 3
    @filterFn = ( x ) -> x % 2 is 0

    @n = 100
    @array = [0...@n]

    @list = Sonic.create(@array)
    @transformedList = new Sonic.TransformedList(@list, mapFn: @mapFn, filterFn: @filterFn)

  it "should be a list of transformed elements", ->
    array = (x for x in [0...300] by 6)
    expect(@transformedList.toArray()).toEqual array

  it "should create a new signal when one is added to the source list", ->
    expect(@transformedList.contains(600)).toBe false
    @list.push(200)
    expect(@transformedList.contains(600)).toBe true

  it "should delete the corresponding signal when one is deleted from the source list", ->
    expect(@transformedList.contains(0)).toBe true
    @list.remove(0)
    expect(@transformedList.contains(0)).toBe false
