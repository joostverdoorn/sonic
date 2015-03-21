describe "FlatMapList", ->

  beforeEach ->
    @source = Sonic [0...10]
    @flatMapList = new Sonic.FlatMapList @source

  it "should invalidate when the source invalidates", ->
    spyOn @flatMapList, '_invalidate'

    @source._invalidate()
    expect(@flatMapList._invalidate).toHaveBeenCalled()

  it "should invalidate when the flatMapFn invalidates", ->
    spyOn @flatMapList, '_invalidate'

    @flatMapList._flatMapFn._invalidate()
    expect(@flatMapList._invalidate).toHaveBeenCalled()

  describe "#get", ->
    it "should return undefined when the id is 0", ->
      expect(@flatMapList.get 0).toBe undefined

    it "should return undefined when no id is given", ->
      expect(@flatMapList.get()).toBe undefined

    it "should return undefined when the given id is not present", ->
      expect(@flatMapList.get -1).toBe undefined

    it "should return the value when a valid id is given", ->
      id = @flatMapList.idAt 3
      expect(@flatMapList.get id).toBe 3

  describe "#has", ->
    it "should return false when the id is 0", ->
      expect(@flatMapList.has 0).toBe false

    it "should return false when no id is given", ->
      expect(@flatMapList.has()).toBe false

    it "should return true when a valid id is given", ->
      id = @flatMapList.idAt 3
      expect(@flatMapList.has id).toBe true

  describe "#prev", ->
    it "should return null when the given id isn't present", ->
      expect(@flatMapList.prev -1).toBe null

    it "should return null when the given id is the first of the list", ->
      id = @flatMapList.idAt 0
      expect(@flatMapList.prev id).toBe null

    it "should return the last id of the last list when 0 is given", ->
      id = @flatMapList.prev 0
      expect(id).toBe @flatMapList._listBySourceId[@source.prev()].prev()

    it "should return the last id of the last list when no id is given", ->
      id = @flatMapList.prev()
      expect(id).toBe @flatMapList._listBySourceId[@source.prev()].prev()

    it "should return the id previous to the given id when the given id is present", ->
      id = @flatMapList.idAt 3
      expect(@flatMapList.get(@flatMapList.prev(id))).toBe 2

  describe "#next", ->
    it "should return null when the given id isn't present", ->
      expect(@flatMapList.next -1).toBe null

    it "should return null when the given id is the last of the list", ->
      id = @flatMapList.idAt 9
      expect(@flatMapList.next id).toBe null

    it "should return the first id of the first list when 0 is given", ->
      id = @flatMapList.next 0
      expect(id).toBe @flatMapList._listBySourceId[@source.next()].next()

    it "should return the first id of the first list when no id is given", ->
      id = @flatMapList.next()
      expect(id).toBe @flatMapList._listBySourceId[@source.next()].next()

    it "should return the id next to the given id when the given id is present", ->
      id = @flatMapList.idAt 3
      expect(@flatMapList.get(@flatMapList.next(id))).toBe 4

  describe "#_getListBySourceId", ->
    it "should return undefined if the source doesn't contain the given sourceId", ->
      expect(@flatMapList._getListBySourceId -1).toBe undefined

    it "should create a new list when no list is present for the given sourceId", ->
      sourceId = @source.idOf 3
      expect(@flatMapList._listBySourceId[sourceId]).not.toBeDefined()

      list = @flatMapList._getListBySourceId sourceId
      expect(@flatMapList._listBySourceId[sourceId]).toBe list

    it "should return the continueached list when it's present for the given sourceId", ->
      sourceId = @source.idOf 3
      list = @flatMapList._getListBySourceId sourceId
      expect(@flatMapList._getListBySourceId sourceId).toBe list

    it "should invalidate when the list invalidates", ->
      spyOn @flatMapList, '_invalidate'
      sourceId = @source.idOf 3
      list = @flatMapList._getListBySourceId sourceId

      list._invalidate()
      expect(@flatMapList._invalidate).toHaveBeenCalled()

  describe "#_getListById", ->
    it "should return undefined when the given id isn't present", ->
      expect(@flatMapList._getListById -1).toBe undefined

    it "should return the list of the given id when the given id is present", ->
      id = @flatMapList.idAt 3
      list = @flatMapList._getListById id
      expect(list.has id).toBe true

  describe "#_onSourceInvalidate", ->


  describe "#_onListInvalidate", ->


  describe "#_onFlatMapFnInvalidate", ->
    it "should call _invalidate", ->
      spyOn @flatMapList, '_invalidate'

      @flatMapList._onFlatMapFnInvalidate()
      expect(@flatMapList._invalidate).toHaveBeenCalled()

  describe "#_invalidate", ->
