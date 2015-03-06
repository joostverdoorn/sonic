describe "List", ->

  beforeEach ->
    @list = new Sonic.AbstractList()
    @list._move(0, prev: 0)
    @list._add(i, next: 0) for i in [0...10]

  describe "#_add", ->

    it "should add the given signal to the index", ->
      item = "apple"
      id = @list._add item
      expect(@list.get id).toBe item

  describe "#_set", ->

    it "should change the value of the given id", ->
      item = "apple"
      replacement = "pear"
      id = @list._add item
      @list._set(id, replacement)
      expect(@list.get id).toBe replacement

  describe "#_delete", ->

    it "should delete the item", ->
      item = "mango"
      id = @list._add(item)
      expect(@list.get id).toBe(item)

      @list._delete(id)
      expect(@list.get id).not.toBeDefined()

    it "should move the item out of the linked list structure", ->
      item1 = "apple"
      item2 = "pear"
      item3 = "banana"

      id1 = @list._add(item1)
      id2 = @list._add(item2, prev: id1)
      id3 = @list._add(item3, prev: id2)

      @list._delete(id2)

      console.log JSON.stringify @list._prev[id3]

      expect(@list.next id1).toBe id3
      expect(@list.prev id3).toBe id1

    it "should emit an event"

  describe "#_move", ->

    beforeEach ->
      @item1 = "apple"
      @item2 = "pear"
      @item3 = "banana"

      @id1 = @list._add(@item1)
      @id2 = @list._add(@item2, prev: @id1)
      @id3 = @list._add(@item3, prev: @id2)

    it "should remove the item from its current position", ->
      expect(@list.next(@id1)).toBe(@id2)
      expect(@list.prev(@id3)).toBe(@id2)

      @list._move(@id2, prev: @id3)

      expect(@list.next @id1).toBe(@id3)
      expect(@list.prev @id3).toBe(@id1)

    it "should move the item into its new position", ->
      @list._move(@id2, prev: @id3)

      expect(@list.next @id3).toBe(@id2)
      expect(@list.prev @id2).toBe(@id3)

  describe "#getIterator", ->

    it "should return a new iterator for this list", ->
      iterator = @list.getIterator()
      expect(iterator).toEqual(jasmine.any(Sonic.Iterator))
      expect(iterator.list).toBe(@list)

  describe "#prev", ->

    it "should return the id before the given id", ->
      id = @list.idOf 5
      prevId = @list.prev id
      expect(@list.get prevId).toBe 4

    it "should return the last id if no id is given", ->
      @list._add 42, next: 0
      lastId = @list.prev null
      expect(@list.get lastId).toBe 42

  describe "#next", ->

    it "should return the id after the given id", ->
      id = @list.idOf 5
      nextId = @list.next id
      expect(@list.get nextId).toBe 6

    it "should return the first id if no id is given", ->
      @list._add 42, prev: 0
      firstId = @list.next null
      expect(@list.get firstId).toBe 42

  describe "#idAt", ->

    it "should return the id of the item at the given index", ->
      id = @list.idOf(5)
      expect(@list.idAt(5)).toBe(id)

  describe "#indexOf", ->

    it "should return the index of the given item when it exists", ->
      expect(@list.indexOf(5)).toBe(5)

    # it "should return -1 when the isn't found within the limit", ->
    #   expect(@list.indexOf(5, 5)).toBe(-1)

    it "should return -1 if the item isn't found", ->
      expect(@list.indexOf(10)).toBe(-1)

  describe "#idOf", ->

    it "should return the id of the given item", ->
      item = "strawberry"
      id = @list._add(item, prev: 0)
      expect(@list.idOf(item)).toBe(id)

    it "should return undefined if the item isn't found", ->
      item = "foo"
      expect(@list.idOf(item)).not.toBeDefined()

  describe "#get", ->

    it "should return the item with the specified id", ->
      item = "pear"
      id = @list._add(item)
      expect(@list.get(id)).toBe(item)

  describe "#contains", ->

    it "should return true if the list contains the given item", ->
      item = "pineapple"
      @list._add(item, prev: 0)
      expect(@list.contains(item)).toBe(true)

    it "should return false if the list doesn't contain the given item", ->
      item = "foo"
      expect(@list.contains(item)).toBe(false)


  describe "#forEach", ->

    it "should call the given function for each item", ->
      items = []
      fn = ( item ) -> items.push(item)
      @list.forEach fn

      expect(items).toEqual([0...10])


  # describe "#filter", ->

  #   it "should return a new TransformedList", ->
  #     expect(@list.filter(->) instanceof Sonic.TransformedList).toBe(true)


  # describe "#map", ->

    # it "should return a new TransformedList", ->
    #   expect(@list.map(->) instanceof Sonic.TransformedList).toBe(true)

  # describe "#reverse", ->

  #   it "should return a new ReversedList", ->
  #     expect(@list.reverse() instanceof Sonic.ReversedList).toBe(true)



  describe "#union", ->

    it "should create a union of this list with the given lists", ->
      list1 = Sonic.create([1,2,3])
      list2 = Sonic.create([3,4,5])

      union = list1.union(list2)
      expect(union.toArray()).toEqual([1,2,3,4,5])



  describe "#pluck", ->

    it "should return a list containing the keys plucked from each item", ->
      items = [
        { color: 'purple' }
        { color: 'green' }
        { color: 'red' }
        { color: 'yellow' }
        { color: 'orange' }
      ]

      list = Sonic.create(items)
      pluckedList = list.pluck('color')
      expect(pluckedList.toArray()).toEqual(['purple','green','red','yellow','orange'])

  describe "#toArray", ->

    it "should return the list's items in an array", ->
      expect(@list.toArray()).toEqual([0...10])
