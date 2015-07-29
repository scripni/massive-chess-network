var net = require("net");
var assert = require("assert");

function MessageBroker(args) {
	args = args || {};
	var messageBroker = {};
	messageBroker.hostname = args.hostname || "freechess.org";
	messageBroker.port = args.port || 5000;
	messageBroker.socket = args.socket || new net.Socket();
	messageBroker.connectAsync = function(onDone) {
		assert(onDone);
		messageBroker.socket.connect(messageBroker.port, messageBroker.hostname, function() {
			console.log("broker connected to " + messageBroker.hostname + ":" + messageBroker.port);
			messageBroker.isConnected = true;
			onDone();
		});
	};
};

module.exports = MessageBroker;