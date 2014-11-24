class MappedList extends AbstractList

  constructor: ( source, mapFn ) ->
    @_source = source
    @_byRootId = {}
    @_mapFn = mapFn

    super()

  _create: ( other, options ) ->
    signal = new MappedSignal(other, @_mapFn)
    @_byRootId[signal.id] = other

    @_add(signal, options)
    return signal

  before: ( signal ) ->
    before = super(signal)
    return before unless before is undefined

    root = signal?.root?()
    beforeRoot = @_source.before(root)
    return beforeRoot unless beforeRoot

    before = @_byRootId[beforeRoot.id]
    return before if before

    before = @_createBefore(beforeRoot, signal, silent: true)
    return before

  after: ( signal ) ->
    after = super(signal)
    return after unless after is undefined

    root = signal?.root?()
    afterRoot = @_source.after(root)
    return afterRoot unless afterRoot

    after = @_byRootId[afterRoot.id]
    return after if after

    after = @_createAfter(afterRoot, signal, silent: true)
    return after

