class MappedEntry extends TailingEntry

  value: ( ) ->
    @_value ||= @list.mapFn(@source.value())
