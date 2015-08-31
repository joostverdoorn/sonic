require('./helpers/promise_matchers');

var Sonic = require('../dist/sonic.browser');

var getError  = new Error(),
    prevError = new Error(),
    nextError = new Error();

beforeEach(function() {
  this.list = new Sonic.ArrayList([1,2,3]);
  this.emptyList = new Sonic.ArrayList([]);

  this.errorList = Sonic.List.create({
    get: function() { return Promise.reject(getError); },
    prev: function() { return Promise.reject(prevError); },
    next: function() { return Promise.reject(nextError); }
  });
});

describe("first", function() {
  it("should resolve with the first item in the list", function(done) {
    expect(Sonic.List.first(this.list)).toResolveWith(1, done);
  });

  it("should reject when the list is empty", function(done) {
    expect(Sonic.List.first(this.emptyList)).toReject(done);
  });

  it("should reject with the thrown error", function(done) {
    expect(Sonic.List.first(this.errorList)).toRejectWith(getError, done);
  });
});

describe("last", function() {
  it("should resolve with the last item in the list", function(done) {
    expect(Sonic.List.last(this.list)).toResolveWith(3, done);
  });

  it("should reject when the list is empty", function(done) {
    expect(Sonic.List.last(this.emptyList)).toReject(done);
  });

  it("should reject the error that is thrown by #get", function(done) {
    expect(Sonic.List.last(this.errorList)).toRejectWith(getError, done);
  });
});

describe("every", function() {
  it("should resolve with true if the predicate is true for each element", function(done) {
    expect(Sonic.List.every(this.list, function(x) { return x < 4; })).toResolveWith(true, done);
  });

  it("should resolve with false if the predicate if false for some element", function(done) {
    expect(Sonic.List.every(this.list, function(x) { return x < 3; })).toResolveWith(false, done);
  });

  it("should hit every element in the list until the predicate returns false", function(done) {
    var res = [];
    Sonic.List.every(this.list, function(x) {
      res.push(x);
      return x < 2;
    }).then(function() {
      expect(res).toEqual([1,2]);
    }).then(done);
  });

  describe("when passing a range", function() {
    it("should start with the first element in that range", function(done) {
      var res = [];
      Sonic.List.every(this.list, function(x) {
        res.push(x);
        return x < 2;
      }, [0, null]).then(function() {
        expect(res).toEqual([2]);
      }).then(done);
    });
  });
});

describe("some", function() {
  it("should resolve with true if the predicate is true for some element", function(done) {
    expect(Sonic.List.some(this.list, function(x) { return x > 2; })).toResolveWith(true, done);
  });

  it("should resolve with false if the predicate if false for each element", function(done) {
    expect(Sonic.List.some(this.list, function(x) { return x > 3; })).toResolveWith(false, done);
  });

  it("should hit every element in the list until the predicate returns true", function(done) {
    var res = [];
    Sonic.List.some(this.list, function(x) {
      res.push(x);
      return x > 1;
    }).then(function() {
      expect(res).toEqual([1,2]);
    }).then(done);
  });

  describe("when passing a range", function() {
    it("should start with the first element in that range", function(done) {
      var res = [];
      Sonic.List.some(this.list, function(x) {
        res.push(x);
        return x > 1;
      }, [0, null]).then(function() {
        expect(res).toEqual([2]);
      }).then(done);
    });
  });
});

describe("forEach", function() {
  it("should execute the given callback for each element in the list")
});
