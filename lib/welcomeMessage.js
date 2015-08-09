var assert = require("assert");

var WelcomeMessage = function(message) {	
	assert(message);

	var welcomeMessage = {};

	var messageSplit = message.split("\n\r");

	if (messageSplit.pop() === "login: ") {
		welcomeMessage.isSuccessful = true;
	}

	return welcomeMessage;
};

module.exports = WelcomeMessage;