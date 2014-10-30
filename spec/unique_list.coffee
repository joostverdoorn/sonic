describe "UniqueList", ->
  beforeEach ->
    @source = [1,2,3,2,4,3,2,1,5,6,7,5,6,3,4,8]
    @list = Sonic.create(@source)
    @uniqueList = @list.uniq()

  it "should work", ->
    expect(@uniqueList.toArray()).toEqual([1,2,3,4,5,6,7,8])

  it "should keep track of the duplicate elements on the list", ->
    @uniqueList.toArray()
    expect(
      @uniqueList
        ._duplicates
        .map( ( d ) ->
          d.value()).toArray()
      ).toEqual([2,3,2,1,5,6,3,4]
    )

  it "should work when mutations on the original list occur", ->

    # Delete
    @list.remove(1)
    expect(@uniqueList.toArray()).toEqual([2,3,4,1,5,6,7,8])

    # Add head
    @list.unshift(1)
    expect(@uniqueList.toArray()).toEqual([2,3,4,1,5,6,7,8])

    # Add tail
    @list.push(9)
    expect(@uniqueList.toArray()).toEqual([2,3,4,1,5,6,7,8,9])

    # Set
    id = @list.idOf(8)
    @list.set(id, 10)
    expect(@uniqueList.toArray()).toEqual([2,3,4,1,5,6,7,10,9])

    # Move
    entry1 = @list.entryOf(2)
    entry2 = @list.entryOf(4)

    @list._move(entry2, before: entry1)
    expect(@uniqueList.toArray()).toEqual([4,2,3,1,5,6,7,10,9])
