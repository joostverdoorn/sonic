class MappedEntry extends TailingEntry

  value: ( ) ->
    return @_value ||= @list.mapFn(@source.value())
