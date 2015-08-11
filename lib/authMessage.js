var assert = require("assert");
var anonMatch = /Logging you in as "([a-z]+)"; you may use this name to play unrated games.[\r\n]+\(After logging in, do "help register" for more info on how to register\.\)[\r\n]+Press return to enter the server as "\1"\:[\r\n]+/i;

function AuthMessage(args) {
	assert(args && args.username && args.guest !== undefined);
	assert(args.index !== undefined && args.length !== undefined);

	this.guest = args.guest;
	this.username = args.username;
	this.index = args.index;
	this.length = args.length;
}

AuthMessage.prototype.getUserName = function() {
	return this.username;
};

AuthMessage.prototype.isGuest = function() {
		return this.guest;
};

AuthMessage.parse = function(data) {
	assert(data);

	// execute the regular expression
	var match = anonMatch.exec(data);
	if (match !== null) {
		return new AuthMessage({
			username: match[1],
			guest: true,
			index: match.index,
			length: match[0].length
		});
	}

	return null;
};

module.exports = AuthMessage;