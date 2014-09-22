describe "Sonic", ->

  describe "#create", ->
    it "should create a new list containing the items", ->
      items = [1,2,3,4]
      list = Sonic.create(items)
      expect(list.toArray()).toEqual(items)
