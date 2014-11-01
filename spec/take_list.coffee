describe "TakeList", ->

  it "should work", ->

    source = [1,2,3,4,5,6,7,8,9,10]
    list = Sonic.create(source)
    takeList = list.take(5)

    expect(takeList.toArray()).toEqual([1,2,3,4,5])
