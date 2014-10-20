Sonic.factory = ( exports ) ->
    exports._                   = Sonic
    exports.create              = Sonic.create
    exports.Event               = Event

    exports.Iterator            = Iterator
    exports.TailingIterator     = TailingIterator
    exports.FilteredIterator    = FilteredIterator
    exports.SortedIterator      = SortedIterator
    exports.ReversedIterator    = ReversedIterator

    exports.Entry               = Entry
    exports.TailingEntry        = TailingEntry
    exports.MappedEntry         = MappedEntry
    exports.ConcatenatedEntry   = ConcatenatedEntry
    exports.SortedEntry         = SortedEntry

    exports.AbstractList        = AbstractList
    exports.SimpleList          = SimpleList
    exports.TailingList         = TailingList
    exports.FilteredList        = FilteredList
    exports.MappedList          = MappedList
    exports.ConcatenatedList    = ConcatenatedList
    exports.UniqueList          = UniqueList
    exports.SortedList          = SortedList
    exports.ReversedList        = ReversedList



# Exports Sonic for CommonJS, AMD and the browser.
if typeof exports == 'object'
  Sonic.factory(exports)
else if typeof define == 'function' && define.amd
  define ['exports'], (exports) ->
    Sonic.factory(@Sonic = exports)
    return exports
else
  Sonic.factory(@Sonic = {})
