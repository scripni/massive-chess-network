var assert = require("assert");

var MessageFactory = function(args) {
	assert(args);
	assert(args.parsers);

	var self = this;
	self.parsers = args.parsers;

	self.parse = function(data) {
		var message = null;
		// check if any parser returns a non-null message
		// .some() stops the iteration at the first 'true' result
		self.parsers.some(function(parse) {
			message = parse(data);
			if (message !== null) {
				return true;
			} else {
				return false;
			}
		});

		return message;
	};

	return self;
};

module.exports = MessageFactory;