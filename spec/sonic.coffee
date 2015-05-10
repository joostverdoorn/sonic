Sonic = require '../dist/sonic'

describe "Sonic", ->

  it "should be defined!", ->
    expect(Sonic).toBeDefined()


  # describe "given an array", ->
  #   it "should create a new list containing the items", ->
  #     items = [1,2,3,4]
  #     list = Sonic(items)
  #     expect(list.toArray()).toEqual(items)
  #
  # describe "given an existing list", ->
  #   it "should return the list", ->
  #     items = [1,2,3,4]
  #     list = Sonic(items)
  #     result = Sonic(list)
  #     expect(result).toBe(list)
  #
  # describe "uniqueId", ->
  #   it "should return ascending id every time it is called", ->
  #     results = Sonic.uniqueId() for i in [1..10]
  #
  #     for i,result of results
  #       expect(result - result[0]).toBe(i)
  #
  # describe "unit", ->
  #   it "should return a new instance of Unit", ->
  #     val = "apple"
  #     result = Sonic.unit(val)
  #
  #     expect(result instanceof Sonic.Unit).toBe(true)
  #
  # describe "empty", ->
  #   it "should return an empty unit", ->
  #     val = "apple"
  #     result = Sonic.empty(val)
  #
  #     expect(result instanceof Sonic.Unit).toBe(true)
  #     expect(result._value).not.toBeDefined()
  #
  # describe "getIterator", ->
  #   it "should work when called with an array instead of a list", ->
  #     items = [1,2,3,4]
  #     result = Sonic.getIterator(items)
  #
  #     expect(result instanceof Sonic.Iterator).toBe(true)
  #
  #   it "should return an iterator at the starting point", ->
  #     items = [1,2,3,4]
  #     list = Sonic(items)
  #     start = list.idOf(3)
  #     result = Sonic.getIterator(list, start)
  #
  #     expect(result instanceof Sonic.Iterator).toBe(true)
  #     expect(result.startId).toBe(start)
  #
  # describe "each", ->
  #   it "should work when called with an array instead of a list", ->
  #     spy = spyOn(Sonic.AbstractList::, 'forEach')
  #
  #     items = [1,2,3,4]
  #     fn = () ->
  #
  #     result = Sonic.each(items, fn)
  #
  #     expect(spy).toHaveBeenCalledWith(fn)
  #
  #   it "should proxy forEach", ->
  #     spy = spyOn(Sonic.AbstractList::, 'forEach')
  #
  #     items = [1,2,3,4]
  #     list = Sonic(items)
  #     fn = () ->
  #
  #     Sonic.each(list, fn)
  #
  #     expect(spy).toHaveBeenCalledWith(fn)
  #
  # describe "forEach", ->
  #   it "should work when called with an array instead of a list", ->
  #     spy = spyOn(Sonic.AbstractList::, 'next').and.callThrough()
  #
  #     items = [1,2,3,4]
  #     fn = () ->
  #
  #     result = Sonic.forEach(items, fn)
  #
  #     expect(spy.calls.count()).toBe(5)
  #
  #   it "should call fn with the values of the list", ->
  #     items = [1,2,3,4]
  #     list = Sonic(items)
  #     fn = jasmine.createSpy()
  #
  #     result = Sonic.forEach(list, fn)
  #
  #
  #     expect(fn.calls.count()).toBe(items.length)
  #     for i,args of fn.calls.allArgs()
  #       expect(args).toEqual([items[i], list.idOf(items[i])])
  #
  #
  # describe "findId", ->
  #   it "should work when called with an array instead of a list", ->
  #     spy = spyOn(Sonic.AbstractList::, 'forEach')
  #
  #     items = [1,2,3,4]
  #     fn = () ->
  #
  #     result = Sonic.findId(items, fn)
  #
  #     expect(spy).toHaveBeenCalledWith(jasmine.any(Function))
  #
  #   it "should return the id of the first matching item", ->
  #     items = [2,3,1,4,1]
  #     list = Sonic(items)
  #     fn = (val) -> val is 1
  #
  #     result = Sonic.findId(list, fn)
  #
  #     expect(result).toBe(list.idAt(2))
  #     expect(result).not.toBe(list.idAt(4))
  #
  #
  #   it "should return the undefined if nothing matches", ->
  #     items = [2,3,4,5,6]
  #     list = Sonic(items)
  #     fn = (val) -> val is 1
  #
  #     result = Sonic.findId(list, fn)
  #
  #     expect(result).not.toBeDefined()
  #
  # describe "find", ->
  #   it "should work when called with an array instead of a list", ->
  #     spy = spyOn(Sonic.AbstractList::, 'findId')
  #
  #     items = [1,2,3,4]
  #     fn = () ->
  #
  #     result = Sonic.find(items, fn)
  #
  #     expect(spy).toHaveBeenCalledWith(jasmine.any(Function))
  #
  #   it "should return the value of the first matching item", ->
  #     items = [2,3,1,4,1]
  #     list = Sonic(items)
  #     fn = (val) -> val is 4
  #
  #     result = Sonic.find(list, fn)
  #
  #     expect(result).toBe(4)
  #
  #
  #   it "should return the undefined if nothing matches", ->
  #     items = [2,3,4,5,6]
  #     list = Sonic(items)
  #     fn = (val) -> val is 1
  #
  #     result = Sonic.find(list, fn)
  #
  #     expect(result).not.toBeDefined()
  #
  #
  # describe "idAt", ->
  #   it "should work when called with an array instead of a list", ->
  #     spy = spyOn(Sonic.AbstractList::, 'findId')
  #
  #     items = [1,2,3,4]
  #     index = 3
  #
  #     result = Sonic.idAt(items, index)
  #
  #     expect(spy).toHaveBeenCalledWith(jasmine.any(Function))
  #
  #   it "should return the id of the item at the index", ->
  #     items = [2,3,1,4,1]
  #     list = Sonic(items)
  #     index = 3
  #
  #     result = Sonic.idAt(list, index)
  #
  #     expect(result).toEqual(list.idOf(4))
  #
  #
  #   it "should return the undefined if there is no item at the index", ->
  #     items = [2,3,4,5,6]
  #     list = Sonic(items)
  #     index = Infinity
  #
  #     result = Sonic.idAt(list, index)
  #
  #     expect(result).not.toBeDefined()
  #
  # describe "idOf", ->
  #   it "should work when called with an array instead of a list", ->
  #     spy = spyOn(Sonic.AbstractList::, 'findId')
  #
  #     items = [1,2,3,4]
  #     index = 3
  #
  #     result = Sonic.idAt(items, index)
  #
  #     expect(spy).toHaveBeenCalledWith(jasmine.any(Function))
  #
  #   it "should return the id of the first item with the given value", ->
  #     items = [2,3,1,4,1]
  #     list = Sonic(items)
  #     value = 1
  #
  #     result = Sonic.idOf(list, value)
  #
  #     expect(result).toEqual(list.idAt(2))
  #     expect(result).not.toEqual(list.idAt(4))
  #
  #
  #   it "should return the undefined if there is with the given value", ->
  #     items = [2,3,4,5,6]
  #     list = Sonic(items)
  #     value = 1
  #
  #     result = Sonic.idOf(list, value)
  #
  #     expect(result).not.toBeDefined()
  #
  # describe "at", ->
  #   it "should work when called with an array instead of a list", ->
  #     spy = spyOn(Sonic.AbstractList::, 'idAt')
  #
  #     items = [1,2,3,4]
  #     index = 3
  #
  #     result = Sonic.at(items, index)
  #
  #     expect(spy).toHaveBeenCalledWith(index)
  #
  #   it "should return the id of the item at the index", ->
  #     items = [2,3,1,4,1]
  #     list = Sonic(items)
  #     index = 3
  #
  #     result = Sonic.at(list, index)
  #
  #     expect(result).toEqual(4)
  #
  #
  #   it "should return the undefined if there is no item at the index", ->
  #     items = [2,3,4,5,6]
  #     list = Sonic(items)
  #     index = Infinity
  #
  #     result = Sonic.at(list, index)
  #
  #     expect(result).not.toBeDefined()
  #
  # describe "indexOf", ->
  #   it "should work when called with an array instead of a list", ->
  #     spy = spyOn(Sonic.AbstractList::, 'some')
  #
  #     items = [1,2,3,4]
  #     value = 3
  #
  #     result = Sonic.indexOf(items, value)
  #
  #     expect(spy).toHaveBeenCalledWith(jasmine.any(Function))
  #
  #   it "should return the index of the first item with the given value", ->
  #     items = [2,3,1,4,1]
  #     list = Sonic(items)
  #     value = 1
  #
  #     result = Sonic.indexOf(list, value)
  #
  #     expect(result).toEqual(2)
  #     expect(result).not.toEqual(4)
  #
  #   it "should return the -1 if there is with the given value", ->
  #     items = [2,3,4,5,6]
  #     list = Sonic(items)
  #     value = 1
  #
  #     result = Sonic.indexOf(list, value)
  #
  #     expect(result).toBe(-1)
  #
  # describe "some", ->
  #   it "should work when called with an array instead of a list", ->
  #     spy = spyOn(Sonic.AbstractList::, 'each')
  #
  #     items = [1,2,3,4]
  #     fn = ( ) ->
  #
  #     result = Sonic.some(items, fn)
  #
  #     expect(spy).toHaveBeenCalledWith(jasmine.any(Function))
  #
  #   it "should return true if the predicate holds for an item", ->
  #     items = [2,3,4,5,6]
  #     list = Sonic(items)
  #     fn = ( val ) -> val is 5
  #
  #     result = Sonic.some(list, fn)
  #
  #     expect(result).toBe(true)
  #
  #   it "should return false if the predicate holds for no item", ->
  #     items = [2,3,4,5,6]
  #     list = Sonic(items)
  #     fn = ( val ) -> val is 1
  #
  #     result = Sonic.some(list, fn)
  #
  #     expect(result).toBe(false)
  #
  # describe "any", ->
  #   it "should work when called with an array instead of a list", ->
  #     spy = spyOn(Sonic.AbstractList::, 'some')
  #
  #     items = [1,2,3,4]
  #     fn = ( ) ->
  #
  #     result = Sonic.any(items, fn)
  #
  #     expect(spy).toHaveBeenCalledWith(jasmine.any(Function))
  #
  #   it "should call some with the given arguments", ->
  #     spy = spyOn(Sonic.AbstractList::, 'some')
  #
  #     items = [1,2,3,4]
  #     list = Sonic(items)
  #     fn = ( ) ->
  #
  #     result = Sonic.any(list, fn)
  #
  #     expect(spy).toHaveBeenCalledWith(fn)
  #
  # describe "contains", ->
  #   it "should work when called with an array instead of a list", ->
  #     spy = spyOn(Sonic.AbstractList::, 'some')
  #
  #     items = [1,2,3,4]
  #     value = 3
  #
  #     result = Sonic.contains(items, value)
  #
  #     expect(spy).toHaveBeenCalledWith(jasmine.any(Function))
  #
  #   it "should return true if the list contains the value", ->
  #     items = [1,2,3,4]
  #     list = Sonic(items)
  #     value = 3
  #
  #     result = Sonic.contains(list, value)
  #
  #     expect(result).toBe(true)
  #
  #   it "should return false if the list doesn't contain the value", ->
  #     items = [1,2,3,4]
  #     list = Sonic(items)
  #     value = 5
  #
  #     result = Sonic.contains(list, value)
  #
  #     expect(result).toBe(false)
