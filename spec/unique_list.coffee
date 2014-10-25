describe "UniqueList", ->
  beforeEach ->
    @source = [1,2,3,2,4,3,2,1,5,6,7,5,6,3,4,8]
    @list = Sonic.create(@source)
    @uniqueList = @list.uniq()

  it "should work", ->
    expect(@uniqueList.toArray()).toEqual([1,2,3,4,5,6,7,8])

  it "should keep track of the duplicate elements on the list", ->
    @uniqueList.toArray()
    expect(
      @uniqueList
        ._duplicates
        .map( ( d ) ->
          d.value()).toArray()
      ).toEqual([2,3,2,1,5,6,3,4]
    )
