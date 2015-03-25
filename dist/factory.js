(function() {
  var AbstractList, List, Unit;

  AbstractList = require('./abstract_list');

  List = require('./list');

  Unit = require('./unit');

  module.exports = function(items) {
    if (items instanceof AbstractList) {
      return items;
    } else if (Array.isArray(items)) {
      return new List(items);
    } else if (arguments.length) {
      return new Unit(items);
    } else {
      return new Unit();
    }
  };

}).call(this);

//# sourceMappingURL=factory.js.map
