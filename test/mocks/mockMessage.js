var assert = require("assert");

function MockMessage(args) {
	assert(args && args.message);

	var self = this;
	self.matchStart = args.matchStart || 0;
	self.matchEnd = args.matchEnd || args.message.length;
	self.message = args.message;
	return self;
}

MockMessage.getChannel = function() {
	return "fake-message";
}

MockMessage.prototype.getChannel = function() {
	return MockMessage.getChannel();
};

MockMessage.parseSuccess = function(message) {
	return new MockMessage({
		message: message
	});
};

MockMessage.parseFail = function() {
	return null;
};

MockMessage.parseExact = function(message) {
	return function(data) {
		if (data === message) {
			return new MockMessage({
				message: message
			});
		}

		return null;
	}
};

MockMessage.parseRegex = function(regex) {
	assert(regex);
	return function(data) {
		var result = regex.exec(data);
		if (result) {
			return new MockMessage({
				message: data,
				matchStart: result.index,
				matchEnd: result[0].length
			});
		}
	}
}

module.exports = MockMessage;
