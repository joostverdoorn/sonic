class Generator extends TailingIterator

  attachNext: ( ) ->
    nextVal = @list.generatorFn(@list.source)

    nextSourceId = @list.source.push nextVal, silent: true
    nextSource = @list.source.getEntry nextSourceId

    next = @list.getBySource( nextSource )
    @entry.attachNext next
    return true
