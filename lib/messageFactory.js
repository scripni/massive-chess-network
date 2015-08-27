var assert = require("assert");
var MessageParser = require("./messageParser");

function MessageFactory(args) {
	args = args || {};
	this.parsers = args.parsers || [
		new MessageParser({
			code: "welcome",
			regex: /[\*]{4} Starting FICS session as [a-z]+\(U\) [\*]{4}(.|[\r\n])+\bfics% [\r\n]+/i,
      mappings: []
		}),
    new MessageParser({
      code: "login",
      regex: /\bTrying\s+\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(.|[\r\n])+login:[\s\r\n]+/i,
      mappings: []
    })
	];
}

MessageFactory.prototype.parse = function(data) {
	
	var message = null;
	
	// check if any parser can match the message
	this.parsers.some(function(parser) {
		message = parser.parse(data);
		if (message !== null) {
			return true;
		} else {
			return false;
		}
	});

	return message;
};

module.exports = MessageFactory;