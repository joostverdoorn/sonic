import Cache from './cache';
class Group extends Cache {
    _createSubList() {
        return new Cache({});
    }
}
