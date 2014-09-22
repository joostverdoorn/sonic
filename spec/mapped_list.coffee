describe "MappedList", ->

  beforeEach ->
    @mapFn = ( x ) -> x * 2
    @list = Sonic.create([1,2,3,4,5,6])
    @mappedList = @list.map(@mapFn)



  it "should map each item of the original list with the provided mapping function", ->
    expect(@mappedList.toArray()).toEqual([2,4,6,8,10,12])



  # describe "#length", ->

  #   it "should call source.length", ->
  #     spyOn @list, 'length'

  #     @mappedList.length()
  #     expect(@list.length).toHaveBeenCalled()



  # describe "#get", ->

  #   it "should apply the mapping function to the parent's item with the same id", ->
  #     id = @list.idAt(0)
  #     item = @list.get(id)
  #     expect(@mappedList.get(id)).toEqual(@mapFn(item))



  # describe "#idAt", ->

  #   it "should call source.idAt", ->
  #     spyOn @list, 'idAt'

  #     index = 0
  #     @mappedList.idAt(index)
  #     expect(@list.idAt).toHaveBeenCalledWith(index)
