class SortedList extends AbstractList

  constructor: ( @source, @sortFn ) ->
    super

    @_sourceIdById = {}
    @_idBySourceId = {}

    @_sourceIdById[@headId] = @source.headId
    @_sourceIdById[@tailId] = @source.tailId
    @_idBySourceId[@source.headId] = @headId
    @_idBySourceId[@source.tailId] = @tailId

    @_after[@headId] = @tailId
    @_before[@tailId] = @headId

  before: ( id ) ->
    @_evaluate() unless @_evaluated
    super id

  after: ( id ) ->
    @_evaluate() unless @_evaluated
    super id



  _sort: ( headId = @headId, length = @length ) ->

    half = Math.ceil(length / 2)
    midId = @idAt(half)

    @_merge(@_sort(left, half), @_sort(right, length - half))


  _merge: ( headId, length ) ->






  # _split: ( headId = @headId, length = @length ) ->
  #   i = 0
  #   middleId = headId
  #   while i++ <=
  #     middleId = @_after[middleId]

  #   return middleId



  _evaluate: ( ) ->
    @_evaluated = true
    iterator = @source.getIterator()

    while iterator.moveNext()
      sourceId = iterator.id
      id = @insert iterator.current(), before: @tailId

      @_sourceIdById[id] = sourceId
      @_idBySourceId[sourceId] = id

    # @mergeSort()






