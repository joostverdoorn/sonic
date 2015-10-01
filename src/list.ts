import   Key             from './key';
import   Range           from './range';
import   State           from './state';
import   StateIterator   from './state_iterator';

export abstract class List<V>  {
  getState(): State<V>;
}

export module List {

}

export default List;
