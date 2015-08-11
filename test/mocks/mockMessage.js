var assert = require("assert");

var MockMessage = function() {
	var self = this;

	return self;
};

module.exports = {
	parseSuccess: function() {
		return new MockMessage();
	},
	parseFail: function() {
		return null;
	},
	parseExact: function(message) {
		return function(data) {
			if (data === message) {
				return new MockMessage();
			}

			return null;
		}
	},
	message: MockMessage
};