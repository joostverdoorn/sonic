import   Patch         from './patch';
import   Key           from './key';
import   State         from './state';
import { Store,
         MutableStore } from './store';
import { Observable,
         Subject }     from './observable';

export interface Lens<A,B> {
  get(a: A, key: Key): B;
  set(b: B, key: Key): A;
}

export module Lens {

  export function compose<V,W>(parent: MutableStore<V>, lens: Lens<V, W>): MutableStore<W> {
    var getSubject = Subject.create<Patch<W>>(),
        setSubject = Subject.create<Patch<W>>();

    Observable.map(parent.dispatcher, patch => {
      if (patch.added) return { range: patch.range, added: State.map(patch.added, lens.get) };
      return { range: patch.range };
    }).subscribe(getSubject);

    Observable.map(setSubject, patch => {
      if (patch.added) return { range: patch.range, added: State.map(patch.added, lens.set) };
      return { range: patch.range };
    }).subscribe(parent.dispatcher)

    return Store.create(State.map(parent.state, lens.get), {subscribe: getSubject.subscribe, onNext: setSubject.onNext});
  }
}

export default Lens;
