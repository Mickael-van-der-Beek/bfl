var colog = require('colog');

module.exports = (function () {
	'use strict';

	function It (name, inputs, test, validation, message) {
		this.name = name;
		this.inputs = inputs;
		this.test = test;
		this.validation = validation;
		this.message = message;
	}

	It.prototype.run = function (callback) {
		colog.success(this.name);

		var me = this;

		try {
			me.test.apply(
				me.test,
				me.inputs.concat([
					function () {
						me.validation.apply(
							me.validation,
							[].slice
								.call(arguments)
								.concat([
									function (e, valid) {
										if (e) {
											if (this.message) {
												colog.error(this.message);
											}
											colog.error(e);
											colog.error(e.stack);
										}
										else if (!valid) {
											colog.error(me.message);
										}

										return callback.apply(null, arguments);
									}
								])
						);
					}
				])
			);
		}
		catch (e) {
			if (this.message) {
				colog.error(this.message);
			}
			colog.error(e);
			colog.error(e.stack);

			return callback.apply(null, arguments);
		}
	};

	return It;
})();
