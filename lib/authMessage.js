var assert = require("assert");
var anonMatch = new RegExp("Logging you in as \"([a-z]+)\"; you may use this name to play unrated games\.", "i");

var AuthMessage = function(args) {
	assert(args);
	assert(args.username);
	assert(args.guest !== undefined);

	var self = this;
	self.guest = args.guest;
	self.username = args.username;

	self.getUserName = function() {
		return self.username;
	};

	self.isGuest = function() {
		return self.guest;
	};

	return self;
};

function parseMessage(data) {
	assert(data);

	// execute the regular expression
	var match = anonMatch.exec(data);
	if (match !== null) {
		return new AuthMessage({
			username: match[1],
			guest: true
		});
	}

	return null;
}

module.exports = {
	parse: parseMessage,
	message: AuthMessage
};