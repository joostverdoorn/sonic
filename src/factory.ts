import { factory as _State}    from './state';
import { factory as _List }    from './list';
import { factory as _Mutable } from './mutable';

export module factory {
  export var State   = _State;
  export var List    = _List;
  export var Mutable = _Mutable;
}

export default factory;
