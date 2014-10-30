describe "TailingList", ->

  beforeEach ->
    @source = [1,2,3,4,5]
    @list = Sonic.create @source
    @tailingList = new Sonic.TailingList @list


  describe "#_onCreate", ->

    it "when an item is pushed", ->
      value = 6

      @list.push value
      expect(@tailingList.toArray()).toEqual([1,2,3,4,5,6])

    it "when an item is unshifted", ->
      value = 6

      @list.unshift value
      expect(@tailingList.toArray()).toEqual([6,1,2,3,4,5])

    it "when an item is inserted at an arbitrary position", ->
      value = 6

      previousId = 2
      previous = @list.entryAt(previousId)
      @list._insert value, after: previous

      expect(@tailingList.toArray()).toEqual([1,2,3,6,4,5])

  describe "#_onDelete", ->

    it "should delete the tailing entry", ->
      sourceId = 2
      sourceEntry = @list.entryAt(sourceId)

      @list._delete(sourceEntry)
      expect(@tailingList.toArray()).toEqual([1,2,4,5])

  describe "#_onUpdate", ->

    it "should update the tailing entry", ->
      oldVal = 3
      newVal = 6

      sourceEntry = @list.entryOf(oldVal)
      @list._set(sourceEntry, newVal)

      expect(@tailingList.toArray()).toEqual([1,2,6,4,5])

  describe "#_onMove", ->

    it "should move the tailing entry", ->
      valA = 3
      valB = 1

      sourceEntryA = @list.entryOf(valA)
      sourceEntryB = @list.entryOf(valB)

      @list._move(sourceEntryA, before: sourceEntryB)
      expect(@tailingList.toArray()).toEqual([3,1,2,4,5])
