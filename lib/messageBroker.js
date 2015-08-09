var assert = require("assert");
var net = require("net");

var MessageBroker = function(args) {
	if (args === "undefined") {
		args = {};
	}
	var self = this;

	// initialize properties
	self.message = "";
	self.client = args.client || new net.Socket();
	self.hostname = args.hostname || "freechess.org";
	self.port = args.port || 5000;

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
	});

	return self;
};

module.exports = MessageBroker;