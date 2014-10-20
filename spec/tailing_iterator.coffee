describe "Tailing Iterator", ->

  describe "#next", ->
    beforeEach ->
      @n = 10
      @values = [0...@n]
      @list = Sonic.create(@values)

      @tailingList = new Sonic.TailingList(@list)
      @entries = []
      # for v in @values
      #   @entries[v] = @tailingList.entryAt(v)

    #   @iterator = @tailingList.getIterator(@entries[4])
    #   @iterator.moveNext()

    # it "should, when there is a cached next, return that cache", ->

    #   expect(@tailingList.toArray()).toEqual(@values)
    #   expect(@entries[i].next).toBe(@entries[i+1]) for i in [0...@n]
