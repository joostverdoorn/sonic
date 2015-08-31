beforeEach(function() {
  jasmine.addMatchers({
    toResolve: function(util, customEqualityMatchers) {
      return {
        compare: function(promise, done) {
          if(typeof done != 'function') {
            return {
              pass: false,
              message: "Expected last argument to toResolve to be a callback"
            }
          }

          promise
            .then(done)
            .catch(function() {
              done.fail("Expected promise to resolve, but it rejected");
            });

          return { pass: true };
        }
      }
    },

    toResolveWith: function(util, customEqualityMatchers) {
      return {
        compare: function(promise, expected, done) {
          if(typeof done != 'function') {
            return {
              pass: false,
              message: "Expected last argument to toResolveWith to be a callback"
            }
          }

          promise
            .then(function(actual) {
              if(util.equals(actual, expected, customEqualityMatchers)) {
                done();
              } else {
                done.fail("Expected promise to resolve with " + expected + ", but it resolved with " + actual);
              }
            }).catch(function() {
              done.fail("Expected promise to resolve with " + expected + ", but it rejected");
            });

          return { pass: true };
        }
      }
    },

    toReject: function(util, customEqualityMatchers) {
      return {
        compare: function(promise, done) {
          if(typeof done != 'function') {
            return {
              pass: false,
              message: "Expected last argument to toReject to be a callback"
            }
          }

          promise
            .then(function() {
              done.fail("Expected promise to reject, but it resolved");
            }).catch(done);

          return { pass: true };
        }
      }
    },

    toRejectWith: function(util, customEqualityMatchers) {
      return {
        compare: function(promise, expected, done) {
          if(typeof done != 'function') {
            return {
              pass: false,
              message: "Expected last argument to toRejectWith to be a callback"
            }
          }

          promise
            .then(function() {
              done.fail("Expected promise to reject, but it resolved");
            }).catch(function(actual) {
              if(util.equals(actual, expected, customEqualityMatchers)) {
                done();
              } else {
                done.fail("Expected promise to reject with " + expected + ", but it rejected with " + actual);
              }
            });

          return { pass: true };
        }
      }
    }
  });
});
