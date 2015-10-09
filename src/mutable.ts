import   Key           from './key';
import   State         from './state';
import   List          from './list';
import { Patch,
         SetPatch,
         DeletePatch } from './patch';
import { Observable,
         Observer }    from './observable';

export interface Mutable<V> extends List<V> {
  patches: (Observable<Patch<V>> & Observer<Patch<V>>);
}

export module Mutable {

  export function create<V>(state: State<V>, patches: (Observable<Patch<V>> & Observer<Patch<V>>), reducer: (state: State<V>, patch: Patch<V>) => State<V> = State.patch): Mutable<V> {
    const list = { state, patches };

    Observable.scan(patches, reducer, state).subscribe({
      onNext: (state: State<V>) => {list.state = state}
    });

    return list;
  }
}

export default Mutable;
