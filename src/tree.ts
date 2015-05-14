import Id from './id';
import { List, IList } from './list';

export type Path = Id[];
export interface ITree<V> extends IList<ITree<V> | V> {};

export module Path {
  export function id(path: Path): string {
    return JSON.stringify(path)
  }

  export function create(id: Id): Path {
    return id == null ? null : JSON.parse(id.toString());
  }

  export function head(path: Path): Id {
    return path ? path[0] : null;
  }

  export function get(path: Path, index: number): Id {
    return path[index];
  }

  export function tail(path: Path): Path {
    return path == null ? [] : path.slice(1, path.length);
  }

  export function append(a: Id | Path, b: Id | Path): Path {
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
        id = head,
        value: any;

    if(head != null && !list.has(head)) return;

    do {
      value = list.get(id);

      if(!List.isList(value) || depth == 0) {
        if(id != null && id != head) return [id];
      } else {
        var prevPath = Tree.prev(value, tail, depth - 1);
        if(prevPath != null) return Path.append(id, prevPath);
        tail = [];
      }
    } while((id = list.prev(id)) != null);
  }

  export function next(list: ITree<any>, path: Path = [], depth: number = Infinity): Path {
    var head = Path.head(path),
        tail = Path.tail(path),
        id = head,
        value: any;

    if(head != null && !list.has(head)) return;

    do {
      value = list.get(id);

      if(!List.isList(value) || depth == 0) {
        if(id != null && id != head) return [id];
      } else {
        var nextPath = Tree.next(value, tail, depth - 1);
        if(nextPath != null) return Path.append(id, nextPath);
        tail = [];
      }
    } while((id = list.next(id)) != null);
  }
}
