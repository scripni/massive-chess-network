var assert = require("assert");

var anonMatch = new RegExp("Logging you in as \"([a-z]+)\"; you may use this name to play unrated games\.", "i");

var AuthMessage = function(message) {
	assert(message);
	var authMessage = {};

	var match = anonMatch.exec(message);
	if (match) {
		authMessage.username = match[1];
		authMessage.guest = true;
	}

	authMessage.getUserName = function() {
		return authMessage.username;
	};

	authMessage.isGuest = function() {
		return authMessage.guest;
	};

	return authMessage;
};

module.exports = AuthMessage;