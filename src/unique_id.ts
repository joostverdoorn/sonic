var id = 0;

export function uniqueId(): number {
  return ++id;
}

export default uniqueId;
