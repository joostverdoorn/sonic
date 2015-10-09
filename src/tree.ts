import Key   from './key';
import State from './state';

export type Path = Key[];

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

export type Tree<V> = State<State<V>>;

export module Tree {
  export function get<V>(tree: Tree<V>, path: Path): Promise<Tree<V> | V> {
    var head = Path.get(path, 0),
        tail = Path.get(path, 1);

    return tree.get(head).then(state => state.get(tail));
  }

  export function prev<V>(state: Tree<V>, path: Path = [null, null]): Promise<Path> {
    var head = Path.get(path, 0),
        tail = Path.get(path, 1);

    return null;
  }

  export function next<V>(tree: Tree<V>, path: Path = [null, null]): Promise<Path> {
    var head = Path.get(path, 0),
        tail = Path.get(path, 1);

    return tree.get(head)
      .then(state => state.next(tail))
      .then(next => {
        if (next != null) return [head, next];
        return tree.next(head).then(nextHead => tree.get(nextHead).then(state => state.next().then(first => [nextHead, first])));
      });
  }
}

export default Tree;
