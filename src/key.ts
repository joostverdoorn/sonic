module Key {

  var uniqueKey = 0;

  export const SENTINEL: any = null;

  export function unique() {
    return "s_" + uniqueKey++;
  }
}

export default Key;
