var net = require("net");
var assert = require("assert");

function TelnetSession(args) {

	args = args || {};
	var session = {};
	session.hostname = args.hostname || "freechess.org";
	session.port = args.port || 5000;
	session.client = new net.Socket();

        session.toString = function() {
                return "telnetSession " + session.hostname + ":" + session.port;
	};

	session.connectAsync = function(onMessage, onDone) {

		assert(onMessage && onDone);

		session.client.connect(session.port, session.hostname, function() {

			console.log("connected to " + session.toString()); 
			session.isConnected = true;
			onDone();

		});

		session.client.on("data", function(data) {
			onMessage(data);
		});
	};

	session.getIsConnected = function() {

		return session.isConnected || false;

	};

	session.destroy = function() {

		session.client.destroy();
		session.isConnected = false;

	};

	return session;

}

module.exports = TelnetSession;
