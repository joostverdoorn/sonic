import uniqueId    from './unique_id';
import factory     from './factory';

import List        from './list';
import MutableList from './mutable_list';
import Unit        from './unit';
import ArrayList   from './array_list';
import LinkedList  from './linked_list';

function Sonic(obj: any) {
  return factory(obj);
}

Sonic['List'] = List;
Sonic['MutableList'] = MutableList;
Sonic['Unit'] = Unit;
Sonic['ArrayList'] = ArrayList;
Sonic['LinkedList'] = LinkedList;

export = Sonic;
