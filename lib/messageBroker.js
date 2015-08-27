var assert = require("assert");
var net = require("net");
var util = require("util");
var MessageFactory = require("./messageFactory");
var EventEmitter = require("events").EventEmitter;

var MessageBroker = function(args) {
	args = args || {};
	var self = this;

	// initialize properties
	self.message = "";
	self.client = args.client || new net.Socket();
	self.hostname = args.hostname || "freechess.org";
	self.port = args.port || 5000;
	self.messageFactory = args.messageFactory || new MessageFactory();

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
			self.message = self.message.slice(0, parsedMessage.index) +
				self.message.slice(parsedMessage.length);
			self.emit(parsedMessage.channel, parsedMessage);
		}
	});

	return self;
};

util.inherits(MessageBroker, EventEmitter);
module.exports = MessageBroker;