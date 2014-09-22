describe "ConcatenatedList", ->

  it "should have all items of its sources concatenated", ->
    list1 = Sonic.create([1,2,3])
    list2 = Sonic.create([4,5,6])
    concatenatedList = list1.concat(list2)

    expect(concatenatedList.toArray()).toEqual([1,2,3,4,5,6])

