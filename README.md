# Math.f16round <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![github actions][actions-image]][actions-url]
[![coverage][codecov-image]][codecov-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

An ES-spec-compliant `Math.f16round` shim/polyfill/replacement that works as far down as ES3.

This package implements the [es-shim API](https://github.com/es-shims/api) interface. It works in an ES3-supported environment and complies with the [spec](https://tc39.es/ecma262/#sec-map-objects).

## Getting started

```sh
npm install --save math.f16round
```

## Usage/Examples

```js
const f16round = require('math.f16round');
const assert = require('assert');

assert.equal(f16round(42.84), 42.84375);
assert.equal(f16round(0.123), 0.12298583984375);
assert.equal(f16round(-0.123), -0.12298583984375);
assert.equal(f16round(1.337), 1.3369140625);
assert.equal(f16round(65504), 65504);
assert.equal(f16round(65505), 65504);
```

## Tests
Simply clone the repo, `npm install`, and run `npm test`

[package-url]: https://npmjs.org/package/math.f16round
[npm-version-svg]: https://versionbadg.es/es-shims/Math.f16round.svg
[deps-svg]: https://david-dm.org/es-shims/Math.f16round.svg
[deps-url]: https://david-dm.org/es-shims/Math.f16round
[dev-deps-svg]: https://david-dm.org/es-shims/Math.f16round/dev-status.svg
[dev-deps-url]: https://david-dm.org/es-shims/Math.f16round#info=devDependencies
[npm-badge-png]: https://nodei.co/npm/math.f16round.png?downloads=true&stars=true
[license-image]: https://img.shields.io/npm/l/math.f16round.svg
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/math.f16round.svg
[downloads-url]: https://npm-stat.com/charts.html?package=math.f16round
[codecov-image]: https://codecov.io/gh/es-shims/Math.f16round/branch/main/graphs/badge.svg
[codecov-url]: https://app.codecov.io/gh/es-shims/Math.f16round/
[actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/es-shims/Math.f16round
[actions-url]: https://github.com/es-shims/Math.f16round/actions
