class UniqueList extends TailingList

  constructor: ( source, options = {} ) ->
    super(source, options)
    @_duplicates = new SimpleList()

  _create: ( sourceEntry, options ) ->
    if @contains(sourceEntry.value())
      @_duplicates.push(sourceEntry)
      return null
    return super(sourceEntry, options)

  _delete: ( entry, options ) ->
    value = entry.value()
    return false unless super(entry, options)

    wrapper = @_duplicates.findEntry ( wrapper ) ->
      return value is wrapper.value().value()

    if wrapper
      @_duplicates.delete(wrapper.id)
      @_insert(wrapper.value())

    return true

  _set: ( entry, options = {} ) ->
    @_delete(entry)
    @_insert(entry.source)
