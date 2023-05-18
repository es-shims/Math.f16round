'use strict';

require('../auto');

require('../'); // to ensure no side effects

var test = require('tape');
var keys = require('reflect.ownkeys');
var defineProperties = require('define-properties');
var isEnumerable = Object.prototype.propertyIsEnumerable;
var functionsHaveNames = require('functions-have-names')();

var runTests = require('./tests');

var name = 'f16round';
var fullName = 'Math.' + name;
var method = Math[name];

test('shimmed', function (t) {
	t.equal(method.length, 1, fullName + ' has a length of 1');

	t.test('Function name', { skip: !functionsHaveNames }, function (st) {
		st.equal(method.name, name, fullName + ' has name "' + name + '"');
		st.end();
	});

	t.test('enumerability', { skip: !defineProperties.supportsDescriptors }, function (et) {
		et.equal(false, isEnumerable.call(Math, name), fullName + ' is not enumerable');
		et.end();
	});

	t.match(keys(method).sort().join('|'), /^(arguments\|caller\|)?length|name(\|prototype)?$/, 'has no unexpected own keys');

	runTests(method, t);

	t.end();
});
