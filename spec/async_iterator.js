require('./helpers/promise_matchers');

global.Promise = require('bluebird');
var Sonic = require('../dist/sonic.browser');

var getError  = new Error(),
    prevError = new Error(),
    nextError = new Error();

beforeEach(function() {
  this.state = Sonic.State.fromArray([1,2,3]);
  this.emptyState = Sonic.State.fromArray([]);
  this.errorState = {
    get: function() { return Promise.reject(getError); },
    prev: function() { return Promise.reject(prevError); },
    next: function() { return Promise.reject(nextError); }
  };

  this.iterator = State.toIterator(state);
  this.emptyIterator = State.toIterator(emptyState);
  this.errorIterator = State.toIterator(errorState);
});
//
// describe("first", function() {
//   it("should resolve with the first item in the list", function(done) {
//     expect(Sonic.AsyncIterator.first(this.state)).toResolveWith(1, done);
//   });
//
//   it("should reject when the list is empty", function(done) {
//     expect(Sonic.AsyncIterator.first(this.emptyState)).toReject(done);
//   });
//
//   it("should reject with the thrown error", function(done) {
//     expect(Sonic.AsyncIterator.first(this.errorState)).toRejectWith(getError, done);
//   });
// });
//
// describe("last", function() {
//   it("should resolve with the last item in the list", function(done) {
//     expect(Sonic.AsyncIterator.last(this.state)).toResolveWith(3, done);
//   });
//
//   it("should reject when the list is empty", function(done) {
//     expect(Sonic.AsyncIterator.last(this.emptyState)).toReject(done);
//   });
//
//   it("should reject the error that is thrown by #get", function(done) {
//     expect(Sonic.AsyncIterator.last(this.errorState)).toRejectWith(getError, done);
//   });
// });


describe("some", function() {
  it("should resolve with true if the predicate is true for some element", function(done) {
    expect(Sonic.AsyncIterator.some(this.iterator, function(x) { return x > 2; })).toResolveWith(true, done);
  });

  it("should resolve with false if the predicate if false for each element", function(done) {
    expect(Sonic.AsyncIterator.some(this.iterator, function(x) { return x > 3; })).toResolveWith(false, done);
  });

  it("should hit every element in the list until the predicate returns true", function(done) {
    var res = [];
    Sonic.AsyncIterator.some(this.iterator, function(x) {
      res.push(x);
      return x > 1;
    }).then(function() {
      expect(res).toEqual([1,2]);
    }).then(done);
  });

  // describe("when passing a range", function() {
  //   it("should start with the first element in that range", function(done) {
  //     var res = [];
  //     Sonic.AsyncIterator.some(this.state, function(x) {
  //       res.push(x);
  //       return x > 1;
  //     }, [0, null]).then(function() {
  //       expect(res).toEqual([2]);
  //     }).then(done);
  //   });
  // });
});

describe("every", function() {
  it("should resolve with true if the predicate is true for each element", function(done) {
    expect(Sonic.AsyncIterator.every(this.iterator, function(x) { return x < 4; })).toResolveWith(true, done);
  });

  it("should resolve with false if the predicate if false for some element", function(done) {
    expect(Sonic.AsyncIterator.every(this.iterator, function(x) { return x < 3; })).toResolveWith(false, done);
  });

  it("should hit every element in the list until the predicate returns false", function(done) {
    var res = [];
    Sonic.AsyncIterator.every(this.iterator, function(x) {
      res.push(x);
      return x < 2;
    }).then(function() {
      expect(res).toEqual([1,2]);
    }).then(done);
  });
  //
  // describe("when passing a range", function() {
  //   it("should start with the first element in that range", function(done) {
  //     var res = [];
  //     Sonic.AsyncIterator.every(this.state, function(x) {
  //       res.push(x);
  //       return x < 2;
  //     }, [0, null]).then(function() {
  //       expect(res).toEqual([2]);
  //     }).then(done);
  //   });
  // });
});


// describe("forEach", function() {
//   it("should execute the given callback for each element in the list")
// });
