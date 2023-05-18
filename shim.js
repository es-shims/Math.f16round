'use strict';

var define = require('define-properties');

var getPolyfill = require('./polyfill');

module.exports = function shimMathF16round() {
	var polyfill = getPolyfill();
	define(Math, { f16round: polyfill });
	return polyfill;
};
