describe "GeneratedList", ->
  beforeEach ->
    @fn = (list) -> list.length + 1
    @g = new Sonic.GeneratedList @fn
    @gen = @g.getIterator()
    @gen.moveNext()

  it "should work", ->
    i = 1
    while i < 10
      @gen.moveNext()
      i++


