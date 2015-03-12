describe "FlatMapList", ->

  beforeEach ->
    @arr1 = [0...10]
    @arr2 = [10...20]

    @list1 = Sonic @arr1
    @list2 = Sonic @arr2

    @flatMapList = new Sonic.FlatMapList(@list1)

  it "should work", ->
    # console.log JSON.stringify(@flatMapList.toArray())
  # it "should have all items of its sources concatenated", ->
  #   list1 = Sonic([1,2,3])
  #   list2 = Sonic([4,5,6])
  #   concatenatedList = list1.concat(list2)

  #   expect(concatenatedList.toArray()).toEqual([1,2,3,4,5,6])

  # it "should have all items of its sources concatenated, reversed", ->
  #   list1 = Sonic([1,2,3])
  #   list2 = Sonic([4,5,6])
  #   concatenatedList = list1.concat(list2)
  #   expect(concatenatedList.reverse().toArray()).toEqual([6,5,4,3,2,1])


  # it "should proxy all events", ->
  #   @concatenatedList.events.each ( event ) ->
  #     # console.log event.type, event.id, JSON.stringify event.signal
  #     return true

  #   @concatenatedList.toArray()

  #   @list1.push(i) for i in [20...30]
  #   @list2.unshift(-1)




