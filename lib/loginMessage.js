var assert = require("assert");

function LoginMessage() {
	var self = this;
	return self;
}

LoginMessage.parse = function(data) {
	// check if the message ends with the login prompt
	var lines = data.split("\n\r");
	if (lines.pop() === "login: ") {
		return new LoginMessage();
	}

	return null;
};

module.exports = LoginMessage;