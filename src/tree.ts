import Key           from './key';
import State         from './state';

export type Path = Key[];

export module Path {
  export function key(path: Path): string {
    return path == null ? null : JSON.stringify(path);
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
    return path ? path[index] : null;
  }

  export function tail(path: Path): Path {
    return path == null ? [] : path.slice(1, path.length);
  }

  export function append(a: Key | Path, b: Key | Path): Path {
    return [].concat(a).concat(b);
  }
}

export type Tree<V> = State<State<V>>;

export module Tree {
  export function get<V>(tree: Tree<V>, path: Path): Promise<Tree<V> | V> {
    var head = Path.get(path, 0),
        tail = Path.get(path, 1);

    return tree.get(head).then(state => state.get(tail));
  }

  export function prev<V>(tree: Tree<V>, path: Path): Promise<Path> {
    var head = Path.get(path, 0),
        tail = Path.get(path, 1),
        prevs = State.filter(State.map(tree, state => state.prev()), first => first != null),
        paths = State.map(prevs, (first, key) => [key, first]);

    if (head == null) return paths.prev().then(prev => prev != null ? paths.get(prev) : null);

    return tree.get(head)
      .then(state => state.prev(tail))
      .then(prev => prev != null ? [head, prev] : paths.prev(head).then(prev => prev != null ? paths.get(prev) : null));
  }

  export function next<V>(tree: Tree<V>, path: Path): Promise<Path> {
    var head = Path.get(path, 0),
        tail = Path.get(path, 1),
        nexts = State.filter(State.map(tree, state => state.next()), first => first != null),
        paths = State.map(nexts, (first, key) => [key, first]);

    if (head == null) return paths.next().then(next => next != null ? paths.get(next) : null);

    return tree.get(head)
      .then(state => state.next(tail))
      .then(next => next != null ? [head, next] : paths.next(head).then(next => next != null ? paths.get(next) : null));
  }
}

export default Tree;
