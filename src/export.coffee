Sonic.factory = ( exports ) ->
    exports._                     = Sonic
    exports.create                = Sonic.create

    # exports.Observable            = Observable
    exports.Signal                = Signal
    exports.Node                  = Node
    # exports.MappedSignal          = MappedSignal
    # exports.Transformer           = Transformer

    exports.Iterator              = Iterator
    # exports.TailingIterator       = TailingIterator
    # exports.SortedIterator        = SortedIterator
    # exports.ReversedIterator      = ReversedIterator
    # exports.ConcatenatedIterator  = ConcatenatedIterator
    # exports.Generator             = Generator

    # exports.Entry                 = Entry
    # exports.TailingEntry          = TailingEntry
    # exports.MappedEntry           = MappedEntry
    # exports.SortedEntry           = SortedEntry

    exports.AbstractList          = AbstractList
    exports.SimpleList            = SimpleList
    exports.ProxyList             = ProxyList
    exports.TransformedList       = TransformedList

    # exports.TailingList           = TailingList
    # exports.FilteredList          = FilteredList
    # exports.MappedList            = MappedList

    exports.ConcatenatedList      = ConcatenatedList
    exports.UniqueList            = UniqueList
    exports.SortedList            = SortedList
    exports.ReversedList          = ReversedList
    exports.TakeList              = TakeList

    # exports.GeneratedList         = GeneratedList


# Exports Sonic for CommonJS, AMD and the browser.
if typeof exports == 'object'
  Sonic.factory(exports)
else if typeof define == 'function' && define.amd
  define ['exports'], (exports) ->
    Sonic.factory(@Sonic = exports)
    return exports
else
  Sonic.factory(@Sonic = {})
