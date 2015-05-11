import Id from './id'

export interface IList<V> {
  has: (id: Id) => boolean;
  get: (id: Id) => V;
  prev: (id?: Id) => Id;
  next: (id?: Id) => Id;
}

export class List<V> implements IList<V> {
  has: (id: Id) => boolean;
  get: (id: Id) => V;
  prev: (id?: Id) => Id;
  next: (id?: Id) => Id;

  static isList(obj: any): boolean {
    return !!obj['has'] && !!obj['get'] && !!obj['prev'] && !!obj['next'];
  }

  constructor() {};

  static create<V>(list: IList<V>): List<V> {
    var obj = {
      has: list.has,
      get: list.get,
      prev: list.prev,
      next: list.next
    };

    List.call(obj)
    return <List<V>> obj;
  }

  forEach = (fn: (value: V, id?: Id) => void) => List.forEach(this, fn);
  static forEach<V>(list: IList<V>, fn: (value: V, id?: Id) => void): void {
    var id: Id;
    while((id = list.next(id)) != null) fn(list.get(id), id);
  }

  reduce = <T>(fn: (memo: T, value: V, id?: Id) => T, memo?: T) => List.reduce(this, fn);
  static reduce<V, I, T>(list: IList<V>, fn: (memo: T, value: V, id?: Id) => T, memo?: T): T {
    var id: Id;
    while((id = list.next(id)) != null) memo = fn(memo, list.get(id), id);
    return memo;
  }

  toArray = () => List.toArray(this);
  static toArray<V>(list: IList<V>): V[] {
    return List.reduce(list, function(memo, v) { memo.push(v); return memo }, []);
  }

  findId = (fn: (value: V, id?: Id) => boolean) => List.findId(this, fn);
  static findId<V>(list: IList<V>, fn: (value: V, id?: Id) => boolean): Id {
    var id: Id;
    while((id = list.next(id)) != null) if(fn(list.get(id), id)) return id;
  }

  find = (fn: (value: V, id?: Id) => boolean) => List.find(this, fn);
  static find<V>(list: IList<V>, fn: (value: V, id?: Id) => boolean): V {
    return list.get(List.findId(list, fn));
  }

  idOf = (value: V) => List.idOf(this, value);
  static idOf<V>(list: IList<V>, value: V): Id {
    return List.findId(list, v => v === value);
  }

  indexOf = (value: V) => List.indexOf(this, value);
  static indexOf<V>(list: IList<V>, value: V): number {
    var id: Id, i = 0;
    while((id = list.next(id)) != null) {
      if(list.get(id) === value) return i;
      i++;
    }
  }

  idAt = (index: number) => List.idAt(this, index);
  static idAt<V>(list: IList<V>, index: number): Id {
    var id: Id, i = 0;
    while((id = list.next(id)) != null) if(i++ == index) return id;
    return null;
  }

  at = (index: number) => List.at(this, index);
  static at<V>(list: IList<V>, index: number): V {
    return list.get(List.idAt(list, index));
  }

  every = (predicate: (value: V, id?: Id) => boolean) => List.every(this, predicate);
  static every<V>(list: IList<V>, predicate: (value: V, id?: Id) => boolean): boolean {
    var id: Id;
    while((id = list.next(id)) != null) if(!predicate(list.get(id), id)) return false;
    return true;
  }

  some = (predicate: (value: V, id?: Id) => boolean) => List.some(this, predicate);
  static some<V>(list: IList<V>, predicate: (value: V, id?: Id) => boolean): boolean {
    var id: Id;
    while((id = list.next(id)) != null) if(predicate(list.get(id), id)) return true;
    return false;
  }

  contains = (value: V) => List.contains(this, value);
  static contains<V>(list: IList<V>, value: V): boolean {
    return List.some(list, v => v === value);
  }

  first = () => List.first(this);
  static first<V>(list: IList<V>): V {
    return list.get(list.next());
  }

  last = () => List.last(this);
  static last<V>(list: IList<V>): V {
    return list.get(list.prev());
  }

  reverse = () => List.reverse(this);
  static reverse<V>(list: IList<V>): List<V> {
    function has(id: Id) {
      return list.has(id);
    }

    function get(id: Id) {
      return list.get(id);
    }

    function prev(id: Id) {
      return list.next(id);
    }

    function next(id: Id) {
      return list.prev(id);
    }

    return List.create({has, get, prev, next});
  }

  map = <W>(mapFn: (value: V, id?: Id) => W) => List.map(this, mapFn);
  static map<V, W>(list: IList<V>, mapFn: (value: V, id?: Id) => W): List<W> {
    var { has, prev, next } = list;

    function get(id: Id) {
      return mapFn(list.get(id));
    }

    return List.create({has, get, prev, next});
  }

  filter = (filterFn: (value: V, id?: Id) => boolean) => List.filter(this, filterFn);
  static filter<V>(list: IList<V>, filterFn: (value: V, id?: Id) => boolean): List<V> {
    function has(id: Id) {
      return list.has(id) && filterFn(list.get(id));
    }

    function get(id: Id) {
      if(has(id)) return list.get(id);
      return;
    }

    function prev(id: Id) {
      var prev = id;
      while((prev = list.prev(prev)) != null) if(has(prev)) return prev;
      return null;
    }

    function next(id: Id) {
      var next = id;
      while((next = list.next(next)) != null) if(has(next)) return next;
      return null;
    }

    return List.create({has, get, prev, next});
  }

  flatten = () => List.flatten(this);
  static flatten<V>(list: IList<any>): List<any> {
    function has(id: Id) {
      if(list.has(id[0])) return (list.get(id[0])).has(id[1]);
      return false;
    }

    function get(id: Id) {
      if(list.has(id[0])) return (list.get(id[0])).get(id[1]);
      return;
    }

    function prev(id: Id): Id {
      if(id == null) return [].concat(list.prev()).concat((List.last(list)).prev());
      var prev: Id, listId = id[0];

      if(list.has(listId)) {
        prev = (list.get(listId)).prev(id[1])
        if(prev != null) return [listId, prev];

        while((listId = list.prev(listId)) != null) {
          if((prev = (list.get(listId)).prev()) != null) return [listId, prev];
        }
      }

      return null;
    }

    function next(id: Id): Id {
      if(id == null) return [].concat(list.next()).concat((List.first(list)).next());
      var next: Id, listId = id[0];

      if(list.has(listId)) {
        if((next = (list.get(listId)).next(id[1])) != null) return [listId, next];

        while((listId = list.next(listId)) != null) {
          if((next = (list.get(listId)).next()) != null) return [listId, next];
        }
      }

      return null;
    }

    return List.create({has, get, prev, next});
  }


  flatMap = <W>(flatMapFn:(value: V, id?: Id) => IList<W>) => List.flatMap(this, flatMapFn);
  static flatMap<V, W>(list: IList<V>, flatMapFn:(value: V, id?: Id) => IList<W>): List<W> {
    return List.flatten<W>(List.map(list, flatMapFn));
  }

  static cache<V>(list: IList<V>): List<V> {
    var _get = Object.create(null),
        _next = Object.create(null),
        _prev = Object.create(null);

    function has(id: Id) : boolean {
      if (id == null) return null;
      return id.toString() in _get || list.has(id);
    }

    function get(id: Id) : V {
      if (!has(id)) return null;

      var idString = id.toString(),
        res = _get[idString];

      if (res == null) {
        res = _get[idString] = list.get(id);
      }

      return res;
    }

    function prev(id: Id): Id {
      if (!has(id)) res = list.prev();
      else {
        var idString = id.toString(),
          res = _prev[idString];

        if (res == null) {
          res = _prev[idString] = list.prev(id);
        }
      }

      return res;
    }

    function next(id: Id): Id {
      if (!has(id)) res = list.next();
      else {
        var idString = id.toString(),
          res = _next[idString];

        if (res == null) {
          res = _next[idString] = list.next(id);
        }
      }
      return res;
    }

    return List.create({has, get, prev, next})
  }
}

export default List;
