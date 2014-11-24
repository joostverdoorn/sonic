class FilteredList extends AbstractList

  constructor: ( source, filterFn ) ->
    @_source = source
    @_byRootId = {}
    @_filterFn = filterFn

    super()

  _add: ( signal, options ) ->
    return false unless @_filterFn(signal.value())
    return super(signal, options)

  before: ( signal ) ->
    before = super(signal)
    return before unless before is undefined

    root = signal.root?()
    beforeRoot = @_source.before(root)
    return beforeRoot unless beforeRoot

    until @_add(beforeRoot.value())
      beforeRoot = @_source.before(beforeRoot)
      return beforeRoot unless beforeRoot

    return beforeRoot

  after: ( signal ) ->
    after = super(signal)
    return after unless after is undefined
    # console.log "After: ", signal.value()

    root = signal.root?()
    afterRoot = @_source.after(root)
    return afterRoot unless afterRoot

    until @_add(afterRoot.value())
      afterRoot = @_source.after(afterRoot)
      return afterRoot unless afterRoot

    return afterRoot
