class UniqueList extends TailingList

  constructor: ( source, options = {} ) ->
    super(source, options)
    @_duplicates = new SimpleList()
    @_map = new Map() if Map?
    @on('update', @_onUpdate, @)

  _create: ( sourceEntry, options ) ->
    if @contains(sourceEntry.value())
      @_duplicates.push(sourceEntry)
      return null

    entry = super(sourceEntry, options)
    @_map.set(entry.value(), entry) if @_map

    return entry

  _delete: ( entry, options ) ->
    value = entry.value()

    return false unless super(entry, options)
    @_map.delete(value) if @_map

    wrapper = @_duplicates.findEntry ( wrapper ) ->
      return value is wrapper.value().value()

    if wrapper
      @_duplicates.delete(wrapper.id)
      @_insert(wrapper.value())

    return true

  entryOf: ( value ) ->
    if @_map
      return @_map.get(value)
    else return super

  _onUpdate: ( entry ) ->
    @_delete(entry)
    @_insert(entry.source)
