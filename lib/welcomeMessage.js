var assert = require("assert");

var WelcomeMessage = function() {
	var self = this;

	return self;
};

function parseMessage(data) {
	// check if the message ends with the login prompt
	var lines = data.split("\n\r");
	if (lines.pop() === "login: ") {
		return new WelcomeMessage();
	}

	return null;
}

module.exports = {
	parse: parseMessage,
	message: WelcomeMessage
};