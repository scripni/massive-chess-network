var net = require("net");
var assert = require("assert");

function TelnetSession(session) {

	assert(session);

	var self = this;
	self.hostname = session.hostname || "freechess.org";
	self.port = session.port || 5000;

        self.toString = function() {
                return "telnetSession " + self.hostname + ":" + self.port;
	};

	self.connectAsync = function(onMessage, onDone) {

		assert(onMessage && onDone);

		var client = new net.Socket();
		client.connect(self.port, self.hostname, function() {

			console.log("connected to " + self.toString()); 
			self.isConnected = true;
			onDone();

		});

		client.on("data", function(data) {
			onMessage(data);
		});
	};

	self.getIsConnected = function() {

		return self.isConnected || false;

	};

	return self;

}

module.exports = TelnetSession;
