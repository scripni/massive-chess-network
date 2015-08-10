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
	message: MockMessage
};