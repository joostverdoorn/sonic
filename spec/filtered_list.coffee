describe "FilteredList", ->

  it "should work", ->
    list = Sonic.create([1,2,3,4,5,6,7])

    isEven = ( x ) -> not (x % 2)

    filteredList = list.filter(isEven)
    expect(filteredList.toArray()).toEqual([2,4,6])
