type Id = number | string;

module Id {
  var uniqueId = 0;

  export function key(id: Id): string {
    return id.toString()
  }

  export function create() {
    return uniqueId++;
  }
}

export default Id;
