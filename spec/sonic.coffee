# `import Sonic from 'sonic';`

describe "Sonic", ->

  describe "#create", ->
    it "should create a new list containing the items", ->
      items = [1,2,3,4]
      list = Sonic(items)
      expect(list.toArray()).toEqual(items)
