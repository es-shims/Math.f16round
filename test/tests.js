'use strict';

var hasBigInts = require('has-bigints')();

var maxValue = Number.MAX_VALUE || 1.7976931348623157e+308;
var minValue = Number.MIN_VALUE || 5e-324;
var maxFloat16 = 65504;
var minFloat16 = Math.pow(2, -24);

module.exports = function (f16round, t) {
	t.equal(f16round(), NaN, 'returns NaN when value is absent');
	t.equal(f16round(undefined), NaN, 'returns NaN when value is undefined');
	t.equal(f16round(NaN), NaN, 'returns NaN when value is NaN');

	t.equal(f16round(0), 0, 'returns +0 when value is +0');
	t.equal(f16round(null), 0, 'returns +0 when value is null');

	t.equal(f16round(-0), -0, 'returns -0 when value is -0');

	t.equal(f16round(Infinity), Infinity, 'returns +Infinity when value is +Infinity');
	t.equal(f16round(-Infinity), -Infinity, 'returns -Infinity when value is -Infinity');

	t.equal(f16round(maxValue), Infinity, 'returns +Infinity when value is +Number.MAX_VALUE');
	t.equal(f16round(-maxValue), -Infinity, 'returns -Infinity when value is -Number.MAX_VALUE');

	t.equal(f16round(minValue), 0, 'returns +0 when value is +Number.MIN_VALUE');
	t.equal(f16round(-minValue), -0, 'returns -0 when value is -Number.MIN_VALUE');

	t.test('return same value when value is ±float16 max/min value', function (st) {
		st.equal(f16round(maxFloat16), maxFloat16);
		st.equal(f16round(-maxFloat16), -maxFloat16);
		st.equal(f16round(minFloat16), minFloat16);
		st.equal(f16round(-minFloat16), -minFloat16);

		st.end();
	});

	t.test('return 0 when value is ±float16 min value / 2', function (st) {
		st.equal(f16round(minFloat16 / 2), 0);
		st.equal(f16round(-minFloat16 / 2), -0);

		st.end();
	});

	t.test('return ±float16 min value when value is ±float16 min value / 2 ± a bit number', function (st) {
		st.equal(f16round((minFloat16 / 2) + Math.pow(2, -25)), minFloat16);
		st.equal(f16round((-minFloat16 / 2) - Math.pow(2, -25)), -minFloat16);

		st.end();
	});

	t.test('return 1.3369140625 when value is 1.337', function (st) {
		st.equal(f16round(1.337), 1.3369140625);

		st.end();
	});

	t.test('throws TypeError when value is bigint', { skip: !hasBigInts }, function (st) {
		st['throws'](
			function () { f16round(BigInt(0)); },
			TypeError
		);

		st.end();
	});

	t.test('should coerce to a number immediately', function (st) {
		var valueOfIsNaN = { valueOf: function () { return NaN; } };
		var valueOfIsInfinity = { valueOf: function () { return Infinity; } };

		st.equal(f16round(valueOfIsInfinity), Infinity, 'f16round(valueOfIsInfinity)');
		st.equal(f16round(valueOfIsNaN), NaN, 'f16round(valueOfIsNaN)');

		st.end();
	});
};
