import Key from './key';
import { List, IList } from './list';

export type Path = Key[];
export interface ITree<V> extends IList<ITree<V> | V> {};

export module Path {
  export function key(path: Path): string {
    return JSON.stringify(path)
  }

  export function create(key: Key): Path {
    return key == null ? null : JSON.parse(key.toString());
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
  export function has<V>(list: ITree<any>, path: Path, depth: number = Infinity): boolean {
    var head = Path.head(path),
        tail = Path.tail(path);

    return list.has(head) && (tail.length == 0 || depth == 0 || Tree.has(list.get(head), tail, depth))
  }

  export function get<V>(list: ITree<V>, path: Path, depth: number = Infinity): ITree<V> | V {
    var head = Path.head(path),
        tail = Path.tail(path);

    if(!list.has(head)) return;
    var value = list.get(head);

    if(tail.length == 0 || depth == 0) return value;
    return Tree.get(<ITree<V>> value, tail, depth)
  }

  export function prev(list: ITree<any>, path: Path = [], depth: number = Infinity): Path {
    var head = Path.head(path),
        tail = Path.tail(path),
        key = head,
        value: any;

    if(head != null && !list.has(head)) return;

    do {
      value = list.get(key);

      if(!List.isList(value) || depth == 0) {
        if(key != null && key != head) return [key];
      } else {
        var prevPath = Tree.prev(value, tail, depth - 1);
        if(prevPath != null) return Path.append(key, prevPath);
        tail = [];
      }
    } while((key = list.prev(key)) != null);
  }

  export function next(list: ITree<any>, path: Path = [], depth: number = Infinity): Path {
    var head = Path.head(path),
        tail = Path.tail(path),
        key = head,
        value: any;

    if(head != null && !list.has(head)) return;

    do {
      value = list.get(key);

      if(!List.isList(value) || depth == 0) {
        if(key != null && key != head) return [key];
      } else {
        var nextPath = Tree.next(value, tail, depth - 1);
        if(nextPath != null) return Path.append(key, nextPath);
        tail = [];
      }
    } while((key = list.next(key)) != null);
  }
}

export default Tree;
