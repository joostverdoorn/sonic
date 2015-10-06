function makeEntry(state, key) {
    return {
        key: key,
        state: state,
        get get() {
            return state.get(key);
        },
        get prev() {
            return state.prev(key).then(prev => prev != null ? makeEntry(state, prev) : null);
        },
        get next() {
            return state.next(key).then(next => next != null ? makeEntry(state, next) : null);
        }
    };
}
