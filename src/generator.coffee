class Generator extends TailingIterator

  attachNext: ( ) ->
    return true if @entry.next
    nextVal = @list.generatorFn(@list.source)

    nextSourceId = @list.source.push nextVal, silent: true
    nextSource = @list.source.getEntry nextSourceId
    # console.log "attachNext", nextSource

    next = @list.getBySource( nextSource )
    @entry.attachNext next
    return true
