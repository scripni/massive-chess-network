var assert = require("assert");

function WelcomeMessage(args) {
	assert(args && args.index !== undefined && args.length);
	this.index = args.index;
	this.length = args.length;
}

var regexp = /[\*]{4} Starting FICS session as [a-z]+\(U\) [\*]{4}(.|[\r\n])+\bfics% [\r\n]+/i;

WelcomeMessage.parse = function(data) {
	var match = regexp.exec(data);
	if (match) {
		return new WelcomeMessage({
			index: match.index,
			length: match[0].length
		});
	}

	return null;
};

module.exports = WelcomeMessage;