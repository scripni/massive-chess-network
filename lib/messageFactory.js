var assert = require("assert");
var WelcomeMessage = require("./welcomeMessage");
var AuthMessage = require("./authMessage");
var LoginMessage = require("./loginMessage");

function MessageFactory(args) {
	args = args || {};

	if (args.parsers) {
		args.parsers.forEach(function(parser) {
			assert(parser);
		});
	}

	this.parsers = args.parsers || [
		WelcomeMessage.parse,
		LoginMessage.parse,
		AuthMessage.parse ];
}

MessageFactory.prototype.parse = function(data) {
	var message = null;
	// check if any parser returns a non-null message
	// .some() stops the iteration at the first 'true' result
	this.parsers.some(function(parser) {
		message = parser(data);
		if (message !== null) {
			return true;
		} else {
			return false;
		}
	});

	return message;
};

module.exports = MessageFactory;