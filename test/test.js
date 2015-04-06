var Harness = require('../src/index');

Harness.init({
	setGlobal: true
});

var assert = require('assert');

var set = describe('Test set n°1', function () {

	this.it(
		'Test n°1.1',
		[
			2
		],
		function (n, cb) {
			return cb(
				null,
				Math.pow(n, 2)
			);
		},
		function (e, square, cb) {
			if (e) {
				return cb(e);
			}

			assert.strictEqual(square, 4);

			cb(null);
		}
	);

	this.describe('Test set n°2', function () {

		this.it(
			'Test n°2.1',
			[
				4
			],
			function (n, cb) {
				return cb(
					null,
					Math.sqrt(n)
				);
			},
			function (e, squareroot) {
				if (e) {
					return cb(e);
				}

				assert.strictEqual(squareroot, 1);

				cb(null);
			}
		);

	});

});

set.run();
