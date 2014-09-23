describe "List", ->

  beforeEach ->
    @list = new Sonic.AbstractList()



  describe "#constructor", ->

    it "should construct a list with an empty array of indices to the items", ->
      expect(@list._byId).toEqual({})



  describe "#length", ->

    it "should be 0 for an empty list", ->
      expect(@list.length).toBe(0)



  describe "#getIterator", ->

    it "should return a new iterator for this list", ->
      iterator = @list.getIterator()
      expect(iterator).toEqual(jasmine.any(Sonic.Iterator))
      expect(iterator.list).toBe(@list)



  describe "#create", ->

    beforeEach ->
      @item = "apple"

    it "should return the id of the newly created entry", ->
      entry = @list._create(@item)
      expect(@list.get(entry.id)).toBe(@item)

    it "should increase the length of the list", ->
      length = @list.length
      @list._create(@item)
      expect(@list.length).toBe(length + 1)

    it "should emit an event"



  describe "#delete", ->

    it "should delete the item", ->
      item = "mango"
      entry = @list._create(item)
      expect(@list.get(entry.id)).toBe(item)

      @list._delete(entry)
      expect(@list.get(entry.id)).not.toBeDefined()

    it "should return false when the item doesn't exist", ->
      expect(@list._delete("non-existent id")).toBe(false)

    it "should move the item out of the linked list structure", ->
      item1 = "apple"
      item2 = "pear"
      item3 = "banana"

      id1 = @list._create(item1)
      id2 = @list.insert(item2, after: id1)
      id3 = @list.insert(item3, after: id2)

      @list._delete(id2)

      expect(@list.after(id1)).toBe(id3)
      expect(@list.before(id3)).toBe(id1)

    it "should decrease the length of the list", ->
      item = "mango"
      id = @list._create(item)
      length = @list.length

      @list._delete(id)
      expect(@list.length).toBe(length - 1)

    it "should emit an event"



  describe "#get", ->

    it "should return the item with the specified id", ->
      item = "pear"
      id = @list._create(item)
      expect(@list.get(id)).toBe(item)



  describe "#move", ->

    beforeEach ->
      @item1 = "apple"
      @item2 = "pear"
      @item3 = "banana"

      @id1 = @list._create(@item1)
      @id2 = @list.insert(@item2, after: @id1)
      @id3 = @list.insert(@item3, after: @id2)

    it "should remove the item from its current position", ->
      expect(@list.after(@id1)).toBe(@id2)
      expect(@list.before(@id3)).toBe(@id2)

      @list.move(@id2, after: @id3)

      expect(@list.after(@id1)).toBe(@id3)
      expect(@list.before(@id3)).toBe(@id1)

    it "should move the item into its new position", ->
      @list.move(@id2, after: @id3)

      expect(@list.after(@id3)).toBe(@id2)
      expect(@list.before(@id2)).toBe(@id3)



  describe "#swap", ->

    it "should swap the position of the given items", ->
      itemA = "apple"
      itemB = "orange"

      idA = @list.insert(itemA, after: @list.headEntry)
      idB = @list.insert(itemB, after: idA, before: @list.tailEntry)

      expect(@list.after(idA)).toBe(idB)
      @list.swap(idA, idB)
      expect(@list.after(idB)).toBe(idA)



  describe "#remove", ->

    it "should remove the item", ->
      item = "orange"
      @list._create(item)
      expect(@list.contains(item)).toBe(true)

      @list.remove(item)
      expect(@list.contains(item)).toBe(false)



  describe "#idAt", ->

    it "should return the id of the item at the given index", ->
      @list.items = [1, 5, 4, 3]
      @list.ids   = [3, 0, 2, 1]

      for i in [0 ... @list.length]
        expect(@list.idAt(i)).toBe(@list.entries[i].item)



  describe "#indexOf", ->

    it "should return the index of the given item when", ->
      item = "grape"
      @list.insert(item, after: @list.headEntry)
      expect(@list.indexOf(item)).toBe(0)

    it "should return -1 if the item isn't found", ->
      item = "foo"
      expect(@list.indexOf(item)).toBe(-1)



  describe "#idOf", ->

    it "should return the id of the given item", ->
      item = "strawberry"
      id = @list._create(item)
      expect(@list.idOf(item)).toBe(id)

    it "should return undefined if the item isn't found", ->
      item = "foo"
      expect(@list.idOf(item)).not.toBeDefined()



  describe "#contains", ->

    it "should return true if the list contains the given item", ->
      item = "pineapple"
      @list._create(item)
      expect(@list.contains(item)).toBe(true)

    it "should return false if the list doesn't contain the given item", ->
      item = "foo"
      expect(@list.contains(item)).toBe(false)



  describe "#forEach", ->

    it "should call #each and forward the arguments", ->
      spyOn @list, 'each'
      fn = ->
      @list.forEach(fn)
      expect(@list.each).toHaveBeenCalledWith(fn)



  describe "#each", ->

    it "should call the given function for each item", ->
      id1 = @list.insert(1, after: @list.headEntry)
      id2 = @list.insert(4, after: id1)
      id3 = @list.insert(8, after: id2)

      items = []
      fn = ( item ) -> items.push(item)
      @list.each fn

      expect(items).toEqual([1,4,8])



  describe "#map", ->

    it "should return a new MappedList", ->
      expect(@list.map(->) instanceof Sonic.MappedList).toBe(true)



  describe "#filter", ->

    it "should return a new FilteredList", ->
      expect(@list.filter(->) instanceof Sonic.FilteredList).toBe(true)



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
      id1 = @list.insert(1, after: @list.headEntry)
      id2 = @list.insert(4, after: id1)
      id3 = @list.insert(8, after: id2)

      expect(@list.toArray()).toEqual([1, 4, 8])
