(function() {
  var AbstractList, key, uniqueId, utilities, value;

  uniqueId = require('./unique_id');

  utilities = require('./utilities');

  AbstractList = (function() {
    function AbstractList() {
      this._handlers = {};
    }

    AbstractList.prototype.onInvalidate = function(handler) {
      var handlerId;
      handlerId = uniqueId();
      this._handlers[handlerId] = handler;
      return handlerId;
    };

    AbstractList.prototype.removeListener = function(handlerId) {
      if (!this._handlers[handlerId]) {
        return false;
      }
      delete this._handlers[handlerId];
      return true;
    };

    AbstractList.prototype._invalidate = function(prev, next) {
      var handler, handlers, id, _results;
      handlers = this._handlers;
      _results = [];
      for (id in handlers) {
        handler = handlers[id];
        _results.push((function(id, handler) {
          return setTimeout(function() {
            if (handler(prev, next) === false) {
              return delete handlers[id];
            }
          }, 0);
        })(id, handler));
      }
      return _results;
    };

    return AbstractList;

  })();

  for (key in utilities) {
    value = utilities[key];
    AbstractList.prototype[key] = value;
  }

  module.exports = AbstractList;

}).call(this);

//# sourceMappingURL=abstract_list.js.map
