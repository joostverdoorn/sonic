class ReversedList extends TailingList

  Entry: ReversedEntry

  HeadEntry: -> new @Entry @source.tailEntry, list: @
  TailEntry: -> new @Entry @source.headEntry, list: @
