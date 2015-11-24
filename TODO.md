# TODO

## Iterator
- [x] Fix exceptions to remove lazypromise
- [ ] Add remaining tests
- [x] Queue iterator implementations
- [ ] Flatmap for iterators?

## State
- [ ] Add remaining tests
- [ ] Implement sort
- [ ] Make keys more lazy by not evaluating values (using entries)

## Store
- [x] Filter: fix rewriting of ranges to be as lazy as possible
- [ ] Implement remaining functions from state, reactively
- [ ] Implement reactive sort

## Observable
- [ ] Don't subscribe unless subscribed to in map, filter, scan etc.

## Cache
- [ ] Look at deleted items in cache

## Exceptions
- [ ] Fix weirdness with extending Error

## Patch
- [ ] Test all the things

## Global
- [ ] Check enforcement of string-only keys
- [ ] Don't break on invalid ranges
- [ ] Create convenience API


# Next
- [ ] (?) Observable as https://github.com/zenparsing/es-observable
- [ ] Evaluate space and time
