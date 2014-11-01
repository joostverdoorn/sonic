describe "List", ->

  beforeEach ->
    @list = new Sonic.AbstractList()


    entry = @list.headEntry
    for i in [0...10]
      entry = @list._insert(i, after: entry)

  describe "#_create", ->

    beforeEach ->
      @item = "apple"

    it "should return the id of the newly created entry", ->
      entry = @list._create(@item)
      expect(@list.get(entry.id)).toBe(@item)

      it "should emit an event"



  describe "#_delete", ->

    it "should delete the item", ->
      item = "mango"
      entry = @list._create(item)
      expect(@list.get(entry.id)).toBe(item)

      @list._delete(entry)
      expect(@list.get(entry.id)).not.toBeDefined()

    it "should move the item out of the linked list structure", ->
      item1 = "apple"
      item2 = "pear"
      item3 = "banana"

      entry1 = @list._create(item1)
      entry2 = @list._insert(item2, after: entry1)
      entry3 = @list._insert(item3, after: entry2)

      @list._delete(entry2)

      expect(entry1.next).toBe(entry3)
      expect(entry3.previous).toBe(entry1)

    it "should emit an event"



  describe "#_move", ->

    beforeEach ->
      @item1 = "apple"
      @item2 = "pear"
      @item3 = "banana"

      @entry1 = @list._create(@item1)
      @entry2 = @list._insert(@item2, after: @entry1)
      @entry3 = @list._insert(@item3, after: @entry2)

    it "should remove the item from its current position", ->
      expect(@entry1.next).toBe(@entry2)
      expect(@entry3.previous).toBe(@entry2)

      @list._move(@entry2, after: @entry3)

      expect(@entry1.next).toBe(@entry3)
      expect(@entry3.previous).toBe(@entry1)

    it "should move the item into its new position", ->
      @list._move(@entry2, after: @entry3)

      expect(@entry3.next).toBe(@entry2)
      expect(@entry2.previous).toBe(@entry3)



  describe "#entryOf", ->

    it "should return the first occurence of the value", ->
      item = "banana"
      entry = @list._create(item)

      expect(@list.entryOf(item)).toBe(entry)



  describe "#entryAt", ->

    it "should return the entry of the item at the given index", ->
      entry = @list.entryOf(5)
      expect(@list.entryAt(5)).toBe(entry)



  describe "#idAt", ->

    it "should return the id of the item at the given index", ->
      id = @list.idOf(5)
      expect(@list.idAt(5)).toBe(id)



  describe "#indexOfEntry", ->

    it "should return the index of the given item when it exists", ->
      entry = @list.entryOf(5)
      expect(@list.indexOfEntry(entry)).toBe(5)

    it "should return -1 when the isn't found within the limit", ->
      entry = @list.entryOf(5)
      expect(@list.indexOf(entry, 5)).toBe(-1)

    it "should return -1 if the item isn't found", ->
      entry = new Sonic.Entry(10)
      expect(@list.indexOf(entry)).toBe(-1)



  describe "#indexOf", ->

    it "should return the index of the given item when it exists", ->
      expect(@list.indexOf(5)).toBe(5)

    it "should return -1 when the isn't found within the limit", ->
      expect(@list.indexOf(5, 5)).toBe(-1)

    it "should return -1 if the item isn't found", ->
      expect(@list.indexOf(10)).toBe(-1)



  describe "#idOf", ->

    it "should return the id of the given item", ->
      item = "strawberry"
      id = @list._create(item).id
      expect(@list.idOf(item)).toBe(id)

    it "should return undefined if the item isn't found", ->
      item = "foo"
      expect(@list.idOf(item)).not.toBeDefined()



  describe "#getIterator", ->

    it "should return a new iterator for this list", ->
      iterator = @list.getIterator()
      expect(iterator).toEqual(jasmine.any(Sonic.Iterator))
      expect(iterator.list).toBe(@list)



  describe "#get", ->

    it "should return the item with the specified id", ->
      item = "pear"
      entry = @list._create(item)
      expect(@list.get(entry.id)).toBe(item)



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
      items = []
      fn = ( item ) -> items.push(item)
      @list.each fn

      expect(items).toEqual([0...10])



  describe "#map", ->

    it "should return a new MappedList", ->
      expect(@list.map(->) instanceof Sonic.MappedList).toBe(true)



  describe "#filter", ->

    it "should return a new FilteredList", ->
      expect(@list.filter(->) instanceof Sonic.FilteredList).toBe(true)


  describe "#reverse", ->

    it "should return a new ReversedList", ->
      expect(@list.reverse() instanceof Sonic.ReversedList).toBe(true)



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
