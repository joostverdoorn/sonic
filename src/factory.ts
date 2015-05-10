import List        from './list';
import MutableList from './mutable_list';
import Unit        from './unit';
import ArrayList   from './array_list';

// export default function factory<V,I>(obj: IMutableList<V,I>): MutableList<V,I>;
// export default function factory<V,I>(obj: IList<V,I>): List<V,I>;
// export default function factory<V>(obj: V[]): ArrayList<V>;
// export default function factory<V>(obj: V): Unit<V>;
export default function factory(obj) {
  if(MutableList.isMutableList(obj)) return MutableList.create(obj);
  if(List.isList(obj)) return List.create(obj);
  if(Array.isArray(obj)) return ArrayList.create(obj);
  return Unit.create(obj);
}
