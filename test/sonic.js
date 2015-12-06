import './async_iterator';
import './state';
import './observable';
import './store';

import Sonic from './sonic'

var { map, toArray } = Sonic;

var a = State.fromArray([1,2,3]);

async function x() {
  await a::map(x => x*2)::map(x => x/3)::toArray()
}
