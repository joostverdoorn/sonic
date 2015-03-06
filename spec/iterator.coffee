describe "Iterator", ->

  it "should work", ->
    n = 10
    values = [0...n]

    list = Sonic(values)
    iterator = list.getIterator()


    for i in values
      expect(iterator.next().value).toBe(i)
