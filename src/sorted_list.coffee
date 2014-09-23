class SortedList extends AbstractList

  constructor: ( @source, @sortFn ) ->
    super

    @_sourceIdById = {}
    @_idBySourceId = {}

    @_sourceIdById[@headEntry] = @source.headEntry
    @_sourceIdById[@tailEntry] = @source.tailEntry
    @_idBySourceId[@source.headEntry] = @headEntry
    @_idBySourceId[@source.tailEntry] = @tailEntry

    @_after[@headEntry] = @tailEntry
    @_before[@tailEntry] = @headEntry

  before: ( id ) ->
    @_evaluate() unless @_evaluated
    super id

  after: ( id ) ->
    @_evaluate() unless @_evaluated
    super id

  move: ( id, options = {} ) ->


  _sort: ( headEntry = @headEntry, length = @length ) ->

    half = Math.ceil(length / 2)
    midId = @idAt(half)

    @_merge(@_sort(left, half), @_sort(right, length - half))


  _merge: ( headEntry, length ) ->






  # _split: ( headEntry = @headEntry, length = @length ) ->
  #   i = 0
  #   middleId = headEntry
  #   while i++ <=
  #     middleId = @_after[middleId]

  #   return middleId



  _evaluate: ( ) ->
    @_evaluated = true
    iterator = @source.getIterator()

    while iterator.moveNext()
      sourceId = iterator.id
      id = @insert iterator.current(), before: @tailEntry

      @_sourceIdById[id] = sourceId
      @_idBySourceId[sourceId] = id

    # @mergeSort()






