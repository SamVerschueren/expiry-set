# expiry-set

[![Build Status](https://travis-ci.org/SamVerschueren/expiry-set.svg?branch=master)](https://travis-ci.org/SamVerschueren/expiry-set) [![Coverage Status](https://codecov.io/gh/SamVerschueren/expiry-set/branch/master/graph/badge.svg)](https://codecov.io/gh/SamVerschueren/expiry-set)

> A [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) implementation with expirable keys


## Install

```
$ npm install expiry-set
```


## Usage

```js
import ExpirySet from 'expiry-set';

const set = new ExpirySet(1000, [
	'unicorn'
]);

set.has('unicorn');
//=> true

set.add('rainbow');

console.log(set.size);
//=> 2

// Wait for 1 second...
set.has('unicorn');
//=> false

console.log(set.size);
//=> 0
```


## API

### ExpirySet(maxAge, [iterable])

#### maxAge

Type: `number`

Milliseconds until a key in the `Set` expires.

#### iterable

Type: `Object`

An `Array` or other `iterable` object.

### Instance

Any of the [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) methods.


## Related

- [expiry-map](https://github.com/SamVerschueren/expiry-map) - A `Map` implementation with expirable items


## License

MIT © [Sam Verschueren](https://github.com/SamVerschueren)
