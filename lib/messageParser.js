var assert = require("assert");

function MessageParser(args) {
	assert(args);
	assert(args.code);
	assert(args.regex);

	this.regex = args.regex;
	this.code = args.code;

	this.mappings = args.mappings || [];

	this.channel = this.code + "-channel";
}

MessageParser.prototype.parse = function(message) {
	assert(message);

	var match = this.regex.exec(message);

	if (match) {
		var parsedMessage = {
			code: this.code,
			channel: this.channel,
			index: match.index,
			length: match[0].length
		};

		for (var i = 0; i < this.mappings.length; i++) {
			parsedMessage[this.mappings[i]] = match[i + 1];
		}

		return parsedMessage;
	}

	return null;
};

module.exports = MessageParser;