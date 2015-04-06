var Describe = require('./describe');

module.exports = (function () {
	'use strict';

	function Harness () {}

	Harness.prototype.init = function (config) {
		config = config || {};

		if (config.setGlobal === true) {
			global.describe = function (name, constructor) {
				return new Describe(name, constructor);
			};
		}
	};

	return new Harness();
})();
