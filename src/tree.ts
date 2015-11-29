import Key           from './key';
import State         from './state';

export type Path<K, L> = [K, L];

export module Path {
  export function head<K, L>(path: Path<K, L>): K {
    return path ? path[0] : null;
  }

  export function tail<K, L>(path: Path<K, L>): L {
    return path ? path[1] : null;
  }
}

export type Tree<K, L, V> = State<K, State<L, V>>;

export module Tree {
  export function get<K, L, V>(tree: Tree<K, L, V>, path: Path<K, L>): Promise<V> {
    var head = Path.head(path),
        tail = Path.tail(path);

    return tree.get(head).then(state => state.get(tail));
  }

  export function prev<K, L, V>(tree: Tree<K, L, V>, path: Path<K, L>): Promise<Path<K, L>> {
    var head = Path.head(path),
        tail = Path.tail(path),
        prevs = State.filter(State.map(tree, state => state.prev()), first => first != null),
        paths = State.map(prevs, (first, key) => [key, first]);

    if (head == null) return paths.prev().then(prev => prev != null ? paths.get(prev) : null);

    return tree.get(head)
      .then(state => state.prev(tail))
      .then(prev => prev != null ? [head, prev] : paths.prev(head).then(prev => prev != null ? paths.get(prev) : null));
  }

  export function next<K, L, V>(tree: Tree<K, L, V>, path: Path<K, L>): Promise<Path<K, L>> {
    var head = Path.head(path),
        tail = Path.tail(path),
        nexts = State.filter(State.map(tree, state => state.next()), first => first != null),
        paths = State.map(nexts, (first, key) => [key, first]);

    if (head == null) return paths.next().then(next => next != null ? paths.get(next) : null);

    return tree.get(head)
      .then(state => state.next(tail))
      .then(next => next != null ? [head, next] : paths.next(head).then(next => next != null ? paths.get(next) : null));
  }
}

export default Tree;
