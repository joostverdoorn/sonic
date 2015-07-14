import Key from './key';
import { List, IList } from './list';
import { MutableList, IMutableList } from './mutable_list';

export type Path = Key[];
export interface ITree<V> extends IList<ITree<V> | V> {};
export interface IMutableTree<V> extends IMutableList<IMutableTree<V> | V> {};

export module Path {

  export function key(path: Path): string {
    return JSON.stringify(path)
  }

  export function fromKey(key: Key): Path {
    return key == null ? null : JSON.parse(key.toString());
  }

  export function toKey(path: Path): Key {
    return path == null ? null : JSON.stringify(path);
  }

  export function head(path: Path): Key {
    return path ? path[0] : null;
  }

  export function get(path: Path, index: number): Key {
    return path[index];
  }

  export function tail(path: Path): Path {
    return path == null ? [] : path.slice(1, path.length);
  }

  export function append(a: Key | Path, b: Key | Path): Path {
    return [].concat(a).concat(b);
  }
}

export module Tree {
  export function get<V>(list: ITree<V>, path: Path, depth: number = Infinity): Promise<ITree<V> | V> {
    var head = Path.head(path),
        tail = Path.tail(path);

    return list.get(head).then(value => {
      if(tail.length == 0 || depth == 0) return value;
      return Tree.get(<ITree<V>> value, tail, depth)
    });

  }

  export function prev(list: ITree<any>, path: Path = [], depth: number = Infinity): Promise<Path> {
    var head = Path.head(path),
        tail = Path.tail(path);

    if((head == null || !tail.length) && depth > 0) {
      return list.prev(head).then(key => {
        if (key == null) return null;

        return list.get(key).then(value => {
          if(List.isList(value)) return Tree.prev(value, null, depth - 1).then(prev => {
            return prev == null ? null : Path.append(key, prev);
          });

          return [key];
        });
      });
    }

    if(tail.length && depth > 0) {
      return list.get(head)
        .then(list => Tree.prev(list, tail, depth - 1))
        .then(prev => {
          if(prev != null) return Path.append(head, prev)
          return list.prev(head).then(prev => {
            return prev == null ? null : list.get(prev).then(list => Tree.prev(list, null, depth - 1)).then(tail => Path.append(prev, tail));
          });
        });
    }

    return list.prev(head).then(prev => prev != null ? [prev] : null);
  }

  export function next(list: ITree<any>, path: Path = [], depth: number = Infinity): Promise<Path> {
    var head = Path.head(path),
        tail = Path.tail(path);

    if((head == null || !tail.length) && depth > 0) {
      return list.next(head).then(key => {
        if (key == null) return null;

        return list.get(key).then(value => {
          if(List.isList(value)) return Tree.next(value, null, depth - 1).then(next => {
            return next == null ? null : Path.append(key, next);
          });

          return [key];
        });
      });
    }

    if(tail.length && depth > 0) {
      return list.get(head)
        .then(list => Tree.next(list, tail, depth - 1))
        .then(next => {
          if(next != null) return Path.append(head, next)
          return list.next(head).then(next => {
            return next == null ? null : list.get(next).then(list => Tree.next(list, null, depth - 1)).then(tail => Path.append(next, tail));
          });
        });
    }

    return list.next(head).then(next => next != null ? [next] : null);
  }

  export function set<V>(list: IMutableTree<V>, path: Path, value: V): Promise<void> {
    var head = path.slice(0, path.length - 1);
    var key = path[path.length - 1];

    return get(list, head).then((list: MutableList<V>) => list.set(key, value));
  }

  export function splice<V>(list: IMutableTree<V>, prev: Path, next: Path, ...values: V[]): Promise<void> {
    var prevHead = prev.slice(0, prev.length - 1);
    var prevKey = prev[prev.length - 1];

    var nextHead = next.slice(0, next.length - 1);
    var nextKey = next[next.length - 1];

    return get(list, prevHead)
      .then((list: MutableList<V>) => list.splice(prevKey, nextKey, ...values))

  }
}

export default Tree;
