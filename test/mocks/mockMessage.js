var assert = require("assert");

function MockMessage() {
}

MockMessage.prototype.getChannel = function() {
	return "fake-message";
};

MockMessage.parseSuccess = function() {
	return new MockMessage();
};

MockMessage.parseFail = function() {
	return null;
};

MockMessage.parseExact = function(message) {
	return function(data) {
		if (data === message) {
			return new MockMessage();
		}

		return null;
	}
};

module.exports = MockMessage;
