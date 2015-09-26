require('./helpers/promise_matchers');

var Sonic = require('../dist/sonic.browser');

var getError  = new Error(),
    prevError = new Error(),
    nextError = new Error();

beforeEach(function() {
  this.list = new Sonic.ArrayList([1,2,3]);
  this.iterator = new Sonic.AsyncIterator(this.list);
  this.emptyList = new Sonic.ArrayList([]);

  this.errorList = Sonic.List.create({
    get: function() { return Promise.reject(getError); },
    prev: function() { return Promise.reject(prevError); },
    next: function() { return Promise.reject(nextError); }
  });
});

describe("every", function() {
  it("should resolve with true if the predicate is true for each element", function(done) {
    expect(this.iterator.every(function(x) { return x < 4; })).toResolveWith(true, done);
  });

  it("should resolve with false if the predicate if false for some element", function(done) {
    expect(this.iterator.every(function(x) { return x < 3; })).toResolveWith(false, done);
  });

  it("should hit every element in the list until the predicate returns false", function(done) {
    var res = [];
    this.iterator.every(function(x) {
      res.push(x);
      return x < 2;
    }).then(function() {
      expect(res).toEqual([1,2]);
    }).then(done);
  });

  describe("when passing a range", function() {
    it("should start with the first element in that range", function(done) {
      var res = [];
      this.iterator.every(function(x) {
        res.push(x);
        return x < 2;
      }, [0, null]).then(function() {
        expect(res).toEqual([2]);
      }).then(done);
    });
  });
});
