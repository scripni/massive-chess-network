var net = require("net");
var assert = require("assert");

function TelnetClient(args) {

	args = args || {};
	var client = {};
	client.hostname = args.hostname || "freechess.org";
	client.port = args.port || 5000;
	client.socket = new net.Socket();

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

	function endsWith(str, suffix) {
		return str.indexOf(suffix, str.length - suffix.length) !== -1;
	}

	client.beginReadAsync = function(channel, onNext) {

		assert(channel && onNext);

		var nextMessage = "";

		client.socket.on("data", function(data) {

			console.log("received " + data);
			nextMessage += data;
			if (nextMessage.indexOf(channel) >= 0) {
				onNext(nextMessage);
				nextMessage = "";
			}

		});

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
