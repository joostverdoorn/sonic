(function() {
  var AbstractList, ArrayList,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AbstractList = require('./abstract_list');

  ArrayList = (function(_super) {
    __extends(ArrayList, _super);

    function ArrayList(source) {
      ArrayList.__super__.constructor.call(this);
      this._source = source || [];
    }

    ArrayList.prototype.has = function(index) {
      return (-1 < index && index < this._source.length);
    };

    ArrayList.prototype.get = function(index) {
      return this._source[index];
    };

    ArrayList.prototype.prev = function(index) {
      var length, _ref;
      length = this._source.length;
      if (!length) {
        return;
      }
      if (index == null) {
        return length - 1;
      }
      if (((-1 < (_ref = index - 1) && _ref < index) && index < length)) {
        return index - 1;
      }
    };

    ArrayList.prototype.next = function(index) {
      var length, _ref;
      length = this._source.length;
      if (!length) {
        return;
      }
      if (index == null) {
        return 0;
      }
      if (((-1 < index && index < (_ref = index + 1)) && _ref < length)) {
        return index + 1;
      }
    };

    return ArrayList;

  })(AbstractList);

  module.exports = ArrayList;

}).call(this);

//# sourceMappingURL=array_list.js.map
