describe "AbstractList", ->

  beforeEach ->
    @list = new Sonic.AbstractList()
    @list._move(0, 0)
    @ids = (@list._add(i, null, 0) for i in [0...10])

  describe "#_splice", ->
    it "should return false when no next and no prev are given", ->
      expect(@list._splice()).toBe false

    it "should return false if prev is given but not present in the list", ->
      expect(@list._splice(-1)).toBe false

    it "should return false if next is given but not present in the list", ->
      expect(@list._splice(null, -1)).toBe false

    it "should return false if first is given but not present in the list", ->
      expect(@list._splice(0, null, -1))

    it "should return false if last is given but not present in the list", ->
      expect(@list._splice(0, null, null, -1))

    it "should not delete the prev when a prev is given", ->
      prev = @list._next[0]
      expect(@list._splice(prev)).toBe true

      expect(@list._byId[prev]).toBeDefined()
      expect(@list._prev[prev]).toBeDefined()
      expect(@list._next[prev]).not.toBeDefined()

    it "should not delete the next when a next is given", ->
      next = @list._prev[0]
      expect(@list._splice(null, next)).toBe true

      expect(@list._byId[next]).toBeDefined()
      expect(@list._prev[next]).not.toBeDefined()
      expect(@list._next[next]).toBeDefined()

    it "should not delete the prev or the next when a prev and a next are given", ->
      prev = @list._next[0]
      next = @list._prev[0]
      expect(@list._splice(prev, next)).toBe true

      expect(@list._byId[prev]).toBeDefined()
      expect(@list._prev[prev]).toBeDefined()
      expect(@list._next[prev]).not.toBeDefined()

      expect(@list._byId[next]).toBeDefined()
      expect(@list._prev[next]).not.toBeDefined()
      expect(@list._next[next]).toBeDefined()

    it "should delete all items next of prev", ->
      prev = @list._next[0]
      expect(@list._splice(prev)).toBe true

      for id in @ids when id isnt prev
        expect(@list._byId[id]).not.toBeDefined()
        expect(@list._prev[id]).not.toBeDefined()
        expect(@list._next[id]).not.toBeDefined()

    it "should delete all items prev of next", ->
      next = @list._prev[0]
      expect(@list._splice(null, next)).toBe true

    it "should not delete anything when prev and next are neighbors", ->
      prev = @list._next[0]
      next = @list._next[prev]
      expect(@list._splice(prev, next)).toBe true

      for id in @ids when id isnt next
        expect(@list._byId[id]).toBeDefined()

    it "should disconnect prev and next when prev and next are neighbors", ->
      prev = @list._next[0]
      next = @list._next[prev]

      expect(@list._splice(prev, next)).toBe true
      expect(@list._next[prev]).not.toBeDefined()
      expect(@list._prev[next]).not.toBeDefined()

    it "should move the first next to the prev when a first is passed", ->
      prev = @list._next[0]
      next = @list._next[prev]
      first = @list._prev[0]

      expect(@list._splice(prev, next, first)).toBe true
      expect(@list._next[prev]).toBe first
      expect(@list._prev[first]).toBe prev

    it "should move the last prev to the next when a last is passed", ->
      prev = @list._next[0]
      next = @list._next[prev]
      last = @list._prev[0]

      expect(@list._splice(prev, next, null, last)).toBe true
      expect(@list._prev[next]).toBe last
      expect(@list._next[last]).toBe next

    it "should remove the first from it's old position when a first is passed", ->
      prev = @list._next[0]
      next = @list._next[prev]
      first = @list._prev[0]
      oldPrev = @list._prev[first]
      oldNext = @list._next[first]

      expect(@list._splice(prev, next, first)).toBe true
      expect(@list._next[oldPrev]).toBe oldNext
      expect(@list._prev[oldNext]).toBe oldPrev

  describe "#_add", ->

    it "should return the id of the added value", ->
      item = "apple"
      expect(@list._add item, null, 0).toEqual jasmine.any(Number)

    it "should add the item to the index by the given id", ->
      item = "apple"
      id = @list._add item, null, 0
      expect(@list._byId[id]).toBe item


    it "should return null if no prev and no next are given", ->
      item = "apple"
      expect(@list._add item).toBe(null)

    it "should call _move if a prev is given", ->
      spyOn(@list, '_move').and.callThrough()

      item = "apple"
      id = @list._add item, 0
      expect(@list._move).toHaveBeenCalledWith id, 0, undefined

    it "should call _move if a next is given", ->
      spyOn(@list, '_move').and.callThrough()

      item = "apple"
      id = @list._add item, null, 0
      expect(@list._move).toHaveBeenCalledWith id, null, 0

  describe "#_set", ->

    beforeEach ->
      @item = "apple"
      @replacement = "pear"
      @id = @list._add @item, null, 0

    it "should return false when the id doesn't exist", ->
      expect(@list._set -1, @replacement).toBe false

    it "should return false when the id is 0", ->
      expect(@list._set 0, @replacement).toBe false

    it "should change the value of the given id", ->
      expect(@list._set @id, @replacement).toBe true
      expect(@list._byId[@id]).toBe @replacement

    it "should call _invalidate with the previous and next of the entry", ->
      spyOn @list, '_invalidate'

      @list._set @id, @replacement
      expect(@list._invalidate).toHaveBeenCalledWith(@list._prev[@id], @list._next[@id])

  describe "#_delete", ->

    beforeEach ->
      @item = "apple"
      @id = @list._add @item, null, 0

    it "should return false when the id doesn't exist", ->
      expect(@list._delete -1).toBe false

    it "should return false when the id is 0", ->
      expect(@list._delete 0).toBe false

    it "should delete the item from the index", ->
      expect(@list._delete @id).toBe true
      expect(@list._byId[@id]).not.toBeDefined()

    it "should return false when the id doesn't exist", ->
      expect(@list._delete -1).toBe false

    it "should set the next as the next of the previous", ->
      prev = @list._prev[@id]
      next = @list._next[@id]

      @list._delete @id
      expect(@list._next[prev]).toBe next

    it "should set the previous as the previous of the next", ->
      prev = @list._prev[@id]
      next = @list._next[@id]


      @list._delete @id
      expect(@list._prev[next]).toBe prev

    it "should delete the prev and next of the entry", ->
      @list._delete @id
      expect(@list._prev[@id]).not.toBeDefined()
      expect(@list._next[@id]).not.toBeDefined()

    it "should call _splice", ->
      spyOn @list, '_splice'

      @list._delete @id
      expect(@list._splice).toHaveBeenCalled()

    it "should call _invalidate with the previous and next of the entry", ->
      spyOn @list, '_invalidate'
      prev = @list._prev[@id]
      next = @list._next[@id]

      @list._delete(@id)
      expect(@list._invalidate).toHaveBeenCalledWith prev, next

  describe "#_move", ->

    beforeEach ->
      @item1 = "apple"
      @item2 = "pear"
      @item3 = "banana"

      @id1 = @list._add @item1, 0
      @id2 = @list._add @item2, @id1
      @id3 = @list._add @item3, @id2

    it "should return false when the id doesn't exist", ->
      expect(@list._move -1).toBe false

    it "should remove the item from its current position", ->
      expect(@list.next @id1).toBe @id2
      expect(@list.prev @id3).toBe @id2

      @list._move @id2, @id3

      expect(@list._next[@id1]).toBe @id3
      expect(@list._prev[@id3]).toBe @id1

    it "should move the item into its new position", ->
      @list._move @id2, @id3

      expect(@list.next @id3).toBe @id2
      expect(@list.prev @id2).toBe @id3


  describe "#get", ->

    it "should return the item with the specified id", ->
      item = "pear"
      id = @list._add(item, 0)
      expect(@list.get(id)).toBe(item)

  describe "#has", ->


  describe "#prev", ->

    it "should return the id before the given id", ->
      id = @list.idOf 5
      prevId = @list.prev id
      expect(@list.get prevId).toBe 4

    it "should return the last id if no id is given", ->
      @list._add 42, null, 0
      lastId = @list.prev null
      expect(@list.get lastId).toBe 42

  describe "#next", ->

    it "should return the id after the given id", ->
      id = @list.idOf 5
      nextId = @list.next id
      expect(@list.get nextId).toBe 6

    it "should return the first id if no id is given", ->
      @list._add 42, 0
      firstId = @list.next null
      expect(@list.get firstId).toBe 42
