import Key from './key';
import State from './state';

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
