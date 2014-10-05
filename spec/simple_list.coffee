describe "SimpleList", ->

  beforeEach ->
    @list = new Sonic.SimpleList([1,5,4,3,6])

  describe "#push", ->

    it "should insert the given item before the tail", ->
      item = "pear"
      entry = @list.push(item)
      expect(@list.last()).toBe(item)



  describe "#add", ->

    it "should call #push and forward the arguments", ->
      item = "pear"
      entry = @list.push(item)
      expect(@list.last()).toBe(item)



  describe "#unshift", ->

    it "should insert the given item after the head", ->
      item = "pear"
      @list.unshift(item)
      expect(@list.first()).toBe(item)



  describe "#pop", ->

    it "should remove the item before the tail and return it", ->
      item = @list.last()
      popped = @list.pop()
      expect(popped).toBe(item)



  describe "#shift", ->

    it "should remove the item after the head and return it", ->
      item = @list.first()
      shifted = @list.shift()
      expect(shifted).toBe(item)



  describe "#remove", ->

    it "should remove the item", ->
      item = "orange"
      @list._create(item)
      expect(@list.contains(item)).toBe(true)

      @list.remove(item)
      expect(@list.contains(item)).toBe(false)
