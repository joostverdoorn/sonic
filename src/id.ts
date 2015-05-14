export type IdToken = number | string;
export type Id = IdToken | IdToken[];

export module Id {
  export function key(id: Id) {
    return id.toString();
  }

  export function get(id: Id, index: number): IdToken {
    if(id instanceof Array) return id[index];
    if(index == 0) return <IdToken> id;
    return;
  }

  export function head(id: Id): IdToken {
    return get(id, 0);
  }

  export function tail(id: Id): IdToken[] {
    return id instanceof Array ? id.slice(1, id.length) : [];
  }

  export function append(a: Id, b: Id): Id {
    return [].concat(a).concat(b);
  }
}

export default Id;
