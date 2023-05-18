'use strict';

var implementation = require('./implementation');

module.exports = function getPolyfill() {
	return Math.f16round || implementation;
};
