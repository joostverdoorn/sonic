describe "MappedList", ->

  beforeEach ->
    @mapFn = ( x ) -> x * 2
    @list = Sonic.create([1,2,3,4,5,6])
    @mappedList = @list.map(@mapFn)



  it "should map each item of the original list with the provided mapping function", ->
    expect(@mappedList.toArray()).toEqual([2,4,6,8,10,12])
