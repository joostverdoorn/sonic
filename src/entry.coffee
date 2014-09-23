class Entry

  constructor: ( collection, id, item, previous, next ) ->
    @collection = collection if collection
    @id = id if id
    @item = item if item?
    @previous = previous if previous
    @next = next if next
