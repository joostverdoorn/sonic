describe "SortedList", ->

  it "should work", ->
    sortFn = ( x ) -> -x
    list = Sonic.create([0..31])

    sortedList = list.sort(sortFn)
    expect(sortedList.toArray()).toEqual([31..0])

  # describe "#split", ->

  #   it "should work", ->
  #     sortFn = ( x ) -> x

  #     list = Sonic.create([1,2,3,4,5])

  #     sortedList = list.sort(sortFn)
  #     # sortedList.evaluate()
  #     middleId = sortedList.idOf(4)
      # expect(sortedList.split()).toBe(middleId)
