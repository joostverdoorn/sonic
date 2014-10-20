describe "TailingList", ->

  beforeEach ->
    @a = [1,2,3,4,5]
    @b = Sonic.create @a
    @c = new Sonic.TailingList @b


  describe "#_onCreate", ->

    it "when an item is pushed", ->
      value = 6

      @b.push value
      expect(@c.toArray()).toEqual([1,2,3,4,5,6])

    it "when an item is unshifted", ->
      value = 6

      @b.unshift value
      expect(@c.toArray()).toEqual([6,1,2,3,4,5])

    it "when an item is inserted at an arbitrary position", ->
      value = 6

      previousId = 2
      previous = @b.entryAt(previousId)
      @b._insert value, after: previous

      expect(@c.toArray()).toEqual([1,2,3,6,4,5])

  describe "#_onDelete", ->

    it "should delete the tailing entry", ->
      sourceId = 2
      sourceEntry = @b.entryAt(sourceId)

      @b._delete(sourceEntry)
      expect(@c.toArray()).toEqual([1,2,4,5])

  describe "#_onUpdate", ->

    it "should update the tailing entry", ->
      oldVal = 3
      newVal = 6

      sourceEntry = @b.entryOf(oldVal)
      @b._set(sourceEntry, newVal)

      expect(@c.toArray()).toEqual([1,2,6,4,5])

  describe "#_onMove", ->

    it "should move the tailing entry", ->
      valA = 3
      valB = 4

      sourceEntryA = @b.entryOf(valA)
      sourceEntryB = @b.entryOf(valB)

      @b._move(sourceEntryA, after: sourceEntryB)
      expect(@c.toArray()).toEqual([1,2,4,3,5])
