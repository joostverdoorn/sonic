import factory        from './factory';

import List           from './list';
import ObservableList from './observable_list';
import MutableList    from './mutable_list';
import Unit           from './unit';
import ArrayList      from './array_list';
import LinkedList     from './linked_list';
import {Tree}         from './tree';

function Sonic(obj: any) {
  return factory(obj);
}

Sonic['List'] = List;
Sonic['ObservableList'] = ObservableList;
Sonic['MutableList'] = MutableList;
Sonic['Unit'] = Unit;
Sonic['ArrayList'] = ArrayList;
Sonic['LinkedList'] = LinkedList;
Sonic['Tree'] = Tree;

export = Sonic;
