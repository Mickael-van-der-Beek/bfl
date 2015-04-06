var It = require('./it');

var colog = require('colog');
var async = require('async');

module.exports = (function () {
	'use strict';

	function Describe (name, constructor) {
		this.name = name;

		this.children = [];

		constructor.call(this);
	}

	Describe.prototype.describe = function (name, constructor) {
		this.children.push(
			new Describe(name, constructor)
		);
	};

	Describe.prototype.it = function (name, inputs, test, validation, message) {
		this.children.push(
			new It(name, inputs, test, validation, message)
		);
	};

	Describe.prototype.run = function (callback) {
		colog.success(this.name);

		async.eachSeries(
			this.children,
			function (child, cb) {
				child.run(cb);
			},
			callback
		);
	};

	return Describe;
})();
