import Key from './key';
import { List,           IList           } from './list';
import { ObservableList, IObservableList } from './observable_list';
import { MutableList,    IMutableList    } from './mutable_list';

import Unit      from './unit';
import ArrayList from './array_list';

export default function factory<V,I>(obj: IMutableList<V>): MutableList<V>;
export default function factory<V,I>(obj: IObservableList<V>): ObservableList<V>;
export default function factory<V,I>(obj: IList<V>): List<V>;
export default function factory<V>(obj: V[]): ArrayList<V>;
export default function factory<V>(obj: V): Unit<V>;
export default function factory(obj: any): any {
  if(MutableList.isMutableList(obj)) return MutableList.create(obj);
  if(ObservableList.isObservableList(obj)) return ObservableList.create(obj);
  if(List.isList(obj)) return List.create(obj);
  if(Array.isArray(obj)) return new ArrayList(obj);
  return Unit.create(obj);
}

export function fromPromise<V>(promise: Promise<V>): IObservableList<V> {
  var unit = new Unit<V>();

  promise.then( (value: V) => {
    unit.push(value);
  });

  return ObservableList.create(unit);
}

export function fromIterator<V>(iterator: Iterator<V>): IList<V> {
  var list = {
    has: function(key: Key): boolean { return null; },
    get: function(key: Key): V { return null; },
    prev: function(key: Key): Key { return null; },
    next: function(key: Key): Key { return null; }
  }
  return list;
}
