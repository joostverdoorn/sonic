import { default      as factory,
         fromPromise  as _fromPromise } from './factory';

import _List           from './list';
import _ObservableList from './observable_list';
import _MutableList    from './mutable_list';
import _Unit           from './unit';
import _ArrayList      from './array_list';
import _LinkedList     from './linked_list';
import { Path as _Path, Tree as _Tree } from './tree';

function Sonic(obj: any) {
  return factory(obj);
}

module Sonic {
  export var List           = _List;
  export var ObservableList = _ObservableList;
  export var MutableList    = _MutableList;
  export var Unit           = _Unit;
  export var ArrayList      = _ArrayList;
  export var LinkedList     = _LinkedList;
  export var Tree           = _Tree;
  export var Path           = _Path;

  export var fromPromise    = _fromPromise;
}

declare var module: any;
module.exports = Sonic;
