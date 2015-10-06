import Key from './key';

export type Patch<V> = {
  set?: {
    key: Key
    value: Promise<V>
    before?: Key
  }

  delete?: {
    key: Key
  }
}

export default Patch;
