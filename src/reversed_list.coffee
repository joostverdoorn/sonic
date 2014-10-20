class ReversedList extends TailingList

  Iterator: ReversedIterator

  HeadEntry: -> @_create(@source.tailEntry, silent: true)
  TailEntry: -> @_create(@source.headEntry, silent: true)
