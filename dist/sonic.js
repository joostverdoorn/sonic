var factory_1 = require('./factory');
var list_1 = require('./list');
var observable_list_1 = require('./observable_list');
var mutable_list_1 = require('./mutable_list');
var unit_1 = require('./unit');
var array_list_1 = require('./array_list');
var linked_list_1 = require('./linked_list');
var tree_1 = require('./tree');
function Sonic(obj) {
    return factory_1.default(obj);
}
Sonic['List'] = list_1.default;
Sonic['ObservableList'] = observable_list_1.default;
Sonic['MutableList'] = mutable_list_1.default;
Sonic['Unit'] = unit_1.default;
Sonic['ArrayList'] = array_list_1.default;
Sonic['LinkedList'] = linked_list_1.default;
Sonic['Tree'] = tree_1.Tree;
module.exports = Sonic;
