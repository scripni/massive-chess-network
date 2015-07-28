var net = require("net");
var assert = require("assert");

function TelnetClient(args) {

	args = args || {};
	var client = {};
	client.hostname = args.hostname || "freechess.org";
	client.port = args.port || 5000;
	client.socket = args.socket || new net.Socket();
	client.toString = function() {
		return "telnet session " + client.hostname + ":" + client.port;
	};

	client.connectAsync = function(onDone) {
		assert(onDone);
		client.socket.connect(client.port, client.hostname, function() {
			console.log("connected to " + client.toString());
			client.isConnected = true;
			onDone();
		});
	};

	client.beginReadAsync = function(onNext) {
		assert(onNext);

		// TODO: buffer message until complete
		client.socket.on("data", function(data) {
			onNext(data.toString());
		});
	};

	client.writeLineAsync = function(message, onDone) {
		assert(message && onDone);
		client.socket.write(message + "\n");
		onDone();
	};

	client.getIsConnected = function() {
		return client.isConnected || false;
	};

	client.destroy = function() {
		client.socket.destroy();
		client.isConnected = false;
	};

	return client;

}

module.exports = TelnetClient;
