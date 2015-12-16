# TODO

## Iterator
- [x] Fix exceptions to remove `lazypromise`
- [ ] Add remaining tests
- [x] Queue `iterator` implementations
- [ ] `flatMap` for iterators?

## State
- [ ] Add remaining tests
- [ ] Implement `sort`
- [ ] Make `keys` more lazy by not evaluating values (using entries)
- [x] Generate unique keys for `unit`

## Store
- [x] Add `scan`
- [x] Add `take`
- [x] Filter: fix rewriting of ranges to be as lazy as possible
- [ ] Implement remaining functions from `state`, reactively
- [ ] Implement reactive `sort`
- [x] Look at `states` function
- [ ] Take a long, hard look at `flatten`

## Observable
- [x] Add `toIterator`
- [x] Add `fromIterator`
- [x] Don't subscribe unless subscribed to in `map`, `filter`, `scan` etc.
- [x] Fix `onComplete` and `onError` behaviour

## Cache
- [ ] Look at deleted items in `cache`

## Exceptions
- [ ] Fix weirdness with extending `Error`

## Patch
- [ ] Test all the things

## Global
- [x] Check enforcement of string-only keys
- [ ] Don't break on invalid ranges
- [ ] Create convenience API
- [x] Expand to allow non-string-only keys


# Next
- [ ] (?) Observable as https://github.com/zenparsing/es-observable
- [ ] Evaluate space and time
