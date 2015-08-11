var assert = require("assert");
var net = require("net");
var util = require("util");
var EventEmitter = require("events").EventEmitter;

var MessageBroker = function(args) {
	assert(args);
	assert(args.messageFactory);
	var self = this;

	// initialize properties
	self.message = "";
	self.client = args.client || new net.Socket();
	self.hostname = args.hostname || "freechess.org";
	self.port = args.port || 5000;
	self.messageFactory = args.messageFactory;

	// return the current message
	self.getMessage = function() {
		return self.message;
	};

	// connect to the underlying socket
	self.connect = function(done) {
		assert(done);
		self.client.connect(self.port, self.hostname, function() {
			done();
		});
	};

	// begin receiving messages
	self.client.on("data", function(data) {
		self.message += data;
		var parsedMessage = self.messageFactory.parse(self.message);

		// if the message was recognized, broadcast it and reset state
		if (parsedMessage) {
			self.message = self.message.slice(0, parsedMessage.matchStart) +
				self.message.slice(parsedMessage.matchEnd);
			self.emit(parsedMessage.getChannel(), parsedMessage);
		}
	});

	return self;
};

util.inherits(MessageBroker, EventEmitter);
module.exports = MessageBroker;