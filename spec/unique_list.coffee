describe "UniqueList", ->

  it "should work", ->
    list = Sonic.create([1,2,3,2,4,3,2,1,5,6,7,5,6,3,4,8])
    uniqueList = list.uniq()

    expect(uniqueList.toArray()).toEqual([1,2,3,4,5,6,7,8])
