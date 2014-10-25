class ReversedList extends TailingList

  Iterator: ReversedIterator

  HeadEntry: -> new @Entry(null, list: @, source: @source.tailEntry)
  TailEntry: -> new @Entry(null, list: @, source: @source.headEntry)
