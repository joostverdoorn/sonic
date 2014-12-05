describe "List", ->

  beforeEach ->
    @list = new Sonic.AbstractList()
    @list._move(@list._sentinel, after: @list._sentinel)
    @list._create(i, before: @list._sentinel) for i in [0...10]


  describe "#_create", ->

    beforeEach ->
      @item = "apple"

    it "should create a new signal and return it", ->
      signal = @list._create(@item)
      expect(signal instanceof Sonic.Signal).toBe true

    it "should set the value of the signal to the given value", ->
      signal = @list._create(@item)
      expect(signal.value()).toBe @item

    it "should create a new signal and add it to the index", ->
      signal = @list._create(@item)
      expect(@list._byId[signal.id]).toBe signal

  describe "#_add", ->

    beforeEach ->
      @item = 3.5
      @signal = new Sonic.Signal(@item)
      @list._add @signal

    it "should add the given signal to the index", ->
      expect(@list._byId[@signal.id]).toBe(@signal)

  describe "#_delete", ->

    it "should delete the item", ->
      item = "mango"
      signal = @list._create(item)
      expect(@list.get(signal.id)).toBe(item)

      @list._delete(signal)
      expect(@list.get(signal.id)).not.toBeDefined()

    it "should move the item out of the linked list structure", ->
      item1 = "apple"
      item2 = "pear"
      item3 = "banana"

      signal1 = @list._create(item1)
      signal2 = @list._create(item2, after: signal1)
      signal3 = @list._create(item3, after: signal2)

      @list._delete(signal2)

      expect(@list.after signal1).toBe(signal3)
      expect(@list.before signal3).toBe(signal1)

    it "should emit an event"



  describe "#_move", ->

    beforeEach ->
      @item1 = "apple"
      @item2 = "pear"
      @item3 = "banana"

      @signal1 = @list._create(@item1)
      @signal2 = @list._create(@item2, after: @signal1)
      @signal3 = @list._create(@item3, after: @signal2)

    it "should remove the item from its current position", ->
      expect(@list.after(@signal1)).toBe(@signal2)
      expect(@list.before(@signal3)).toBe(@signal2)

      @list._move(@signal2, after: @signal3)

      expect(@list.after @signal1).toBe(@signal3)
      expect(@list.before @signal3).toBe(@signal1)

    it "should move the item into its new position", ->
      @list._move(@signal2, after: @signal3)

      expect(@list.after @signal3).toBe(@signal2)
      expect(@list.before @signal2).toBe(@signal3)



  # describe "#_insert", ->

  #   beforeEach ->
  #     @item1 = "apple"
  #     @item2 = "pear"
  #     @item3 = "banana"

  #     @signal1 = @list._create(@item1)

  #   it "should insert the item at the given position", ->
  #     @signal2 = @list._create(@item2, after: @signal1)
  #     @signal3 = @list._create(@item3, before: @signal2)

  #     expect( @list.after @signal1).toBe(@signal3)
  #     expect( @list.before @signal2 ).toBe(@signal3)


  # describe "#_insertBefore", ->

  #   beforeEach ->
  #     @item1 = "apple"
  #     @item2 = "pear"
  #     @item3 = "banana"

  #     @signal1 = @list._create(@item1)

  #   it "should insert the item at the given position", ->
  #     @signal2 = @list._create(@item2, before: @signal1)
  #     @signal3 = @list._create(@item3, before: @signal2)

  #     expect( @list.before @signal1).toBe(@signal2)
  #     expect( @list.before @signal2 ).toBe(@signal3)

  # describe "#_insertAfter", ->

  #   beforeEach ->
  #     @item1 = "apple"
  #     @item2 = "pear"
  #     @item3 = "banana"

  #     @signal1 = @list._create(@item1)

  #   it "should insert the item at the given position", ->
  #     @signal2 = @list._create(@item2, after: @signal1)
  #     @signal3 = @list._create(@item3, after: @signal2)

  #     expect( @list.after @signal1).toBe(@signal2)
  #     expect( @list.after @signal2 ).toBe(@signal3)




  describe "#getIterator", ->

    it "should return a new iterator for this list", ->
      iterator = @list.getIterator()
      expect(iterator).toEqual(jasmine.any(Sonic.Iterator))
      expect(iterator.list).toBe(@list)

  describe "#before", ->

    it "should return the signal before the given signal", ->
      signal = @list.signalOf(5)
      previous = @list.before signal
      expect(previous.value()).toBe(4)

    it "should return the last signal if no signal if given", ->
      @list._create 42, before: @list._sentinel
      last = @list.before null
      expect(last.value()).toBe(42)

  describe "#after", ->

    it "should return the signal after the given signal", ->
      signal = @list.signalOf(5)
      next = @list.after signal
      expect(next.value()).toBe(6)

    it "should return the first signal if no signal if given", ->
      @list._create 42, after: @list._sentinel
      first = @list.after null
      expect(first.value()).toBe(42)

  describe "#signalAt", ->

    it "should return the signal of the item at the given index", ->
      signal = @list.signalOf(5)
      expect(@list.signalAt(5)).toBe(signal)



  describe "#idAt", ->

    it "should return the id of the item at the given index", ->
      id = @list.idOf(5)
      expect(@list.idAt(5)).toBe(id)




  describe "#signalOf", ->

    it "should return the first occurence of the value", ->
      item = "banana"
      signal = @list._create(item, after: @list._sentinel)

      expect(@list.signalOf(item)).toBe(signal)


  describe "#indexOfsignal", ->

    it "should return the index of the given item when it exists", ->
      signal = @list.signalOf(5)
      expect(@list.indexOfSignal(signal)).toBe(5)

    it "should return -1 when the isn't found within the limit", ->
      signal = @list.signalOf(5)
      expect(@list.indexOf(signal, 5)).toBe(-1)

    it "should return -1 if the item isn't found", ->
      signal = new Sonic.Signal(10)
      expect(@list.indexOf(signal)).toBe(-1)



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
      id = @list._create(item, after: @list._sentinel).id
      expect(@list.idOf(item)).toBe(id)

    it "should return undefined if the item isn't found", ->
      item = "foo"
      expect(@list.idOf(item)).not.toBeDefined()

  describe "#get", ->

    it "should return the item with the specified id", ->
      item = "pear"
      signal = @list._create(item)
      expect(@list.get(signal.id)).toBe(item)



  describe "#contains", ->

    it "should return true if the list contains the given item", ->
      item = "pineapple"
      @list._create(item, after: @list._sentinel)
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


  describe "#filter", ->

    it "should return a new TransformedList", ->
      expect(@list.filter(->) instanceof Sonic.TransformedList).toBe(true)


  describe "#map", ->

    it "should return a new TransformedList", ->
      expect(@list.map(->) instanceof Sonic.TransformedList).toBe(true)

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
