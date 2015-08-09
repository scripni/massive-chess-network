var WelcomeMessage = function(message) {	
	var welcomeMessage = {};

	var messageSplit = message.split("\n\r");

	if (messageSplit.pop() === "login: ") {
		welcomeMessage.isSuccessful = true;
	}

	return welcomeMessage;
};

module.exports = WelcomeMessage;