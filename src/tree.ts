import Key from './key';
import State from './state';
// import { MutableList, IMutableList } from './mutable_state';

export type Path = Key[];
export interface ITree<V> extends State<ITree<V> | V> {};
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
  export function get<V>(state: ITree<V>, path: Path, depth: number = Infinity): Promise<ITree<V> | V> {
    var head = Path.head(path),
        tail = Path.tail(path);

    return state.get(head).then(value => {
      if(tail.length == 0 || depth == 0) return value;
      return Tree.get(<ITree<V>> value, tail, depth)
    });

  }

  export function prev(state: ITree<any>, path: Path = [], depth: number = Infinity): Promise<Path> {
    var head = Path.head(path),
        tail = Path.tail(path);

    if((head == null || !tail.length) && depth > 0) {
      return state.prev(head).then(key => {
        if (key == null) return null;

        return state.get(key).then(value => {
          if(List.isList(value)) return Tree.prev(value, null, depth - 1).then(prev => {
            return prev == null ? null : Path.append(key, prev);
          });

          return [key];
        });
      });
    }

    if(tail.length && depth > 0) {
      return state.get(head)
        .then(state => Tree.prev(state, tail, depth - 1))
        .then(prev => {
          if(prev != null) return Path.append(head, prev)
          return state.prev(head).then(prev => {
            return prev == null ? null : state.get(prev).then(state => Tree.prev(state, null, depth - 1)).then(tail => Path.append(prev, tail));
          });
        });
    }

    return state.prev(head).then(prev => prev != null ? [prev] : null);
  }

  export function next(state: ITree<any>, path: Path = [], depth: number = Infinity): Promise<Path> {
    var head = Path.head(path),
        tail = Path.tail(path);

    if((head == null || !tail.length) && depth > 0) {
      return state.next(head).then(key => {
        if (key == null) return null;

        return state.get(key).then(value => {
          if(List.isList(value)) return Tree.next(value, null, depth - 1).then(next => {
            return next == null ? null : Path.append(key, next);
          });

          return [key];
        });
      });
    }

    if(tail.length && depth > 0) {
      return state.get(head)
        .then(state => Tree.next(state, tail, depth - 1))
        .then(next => {
          if(next != null) return Path.append(head, next)
          return state.next(head).then(next => {
            return next == null ? null : state.get(next).then(state => Tree.next(state, null, depth - 1)).then(tail => Path.append(next, tail));
          });
        });
    }

    return state.next(head).then(next => next != null ? [next] : null);
  }

  export function set<V>(state: IMutableTree<V>, path: Path, value: V): Promise<void> {
    var head = path.slice(0, path.length - 1);
    var key = path[path.length - 1];

    return get(state, head).then((state: MutableList<V>) => state.set(key, value));
  }

  export function splice<V>(state: IMutableTree<V>, prev: Path, next: Path, ...values: V[]): Promise<void> {
    var prevHead = prev.slice(0, prev.length - 1);
    var prevKey = prev[prev.length - 1];

    var nextHead = next.slice(0, next.length - 1);
    var nextKey = next[next.length - 1];

    return get(state, prevHead)
      .then((state: MutableList<V>) => state.splice(prevKey, nextKey, ...values))

  }
}

export default Tree;
