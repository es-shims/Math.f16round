'use strict';

var ToNumber = require('es-abstract/2024/ToNumber');
var $isFinite = isFinite;

var isNaN = require('is-nan');

var abs = Math.abs;

var BINARY_16_EPSILON = 0.0009765625; // 2 ** -10
var BINARY_16_MIN_VALUE = 6.103515625e-05; // 2 ** -14
var BINARY_16_MAX_VALUE = 65504; // 2 ** 15 - 2 ** 10
var EPSILON = 2.220446049250313e-16; // Number.EPSILON

var inverseEpsilon = 1 / EPSILON;

function roundTiesToEven(n) {
	// Even though this reduces down to `return n`, it takes advantage of built-in rounding.
	return (n + inverseEpsilon) - inverseEpsilon;
}

// modified from `math.fround` package implementation

module.exports = function f16round(x) {
	var v = ToNumber(x);
	if (v === 0 || isNaN(v) || !$isFinite(v)) {
		return v;
	}
	var s = v < 0 ? -1 : 1;
	var mod = abs(v);
	if (mod < BINARY_16_MIN_VALUE) {
		/* eslint operator-linebreak: [2, "before"] */
		return (
			s
			* roundTiesToEven(mod / BINARY_16_MIN_VALUE / BINARY_16_EPSILON)
			* BINARY_16_MIN_VALUE * BINARY_16_EPSILON
		);
	}
	// Veltkamp's splitting (?)
	var a = (1 + (BINARY_16_EPSILON / EPSILON)) * mod;
	var result = a - (a - mod);
	if (result > BINARY_16_MAX_VALUE || isNaN(result)) {
		return s * Infinity;
	}
	return s * result;
};
