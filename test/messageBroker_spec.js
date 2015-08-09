var assert = require("assert");
var MessageBroker = require("../lib/messageBroker");
var MockSocket = require("./mockSocket");

describe("a messsage broker", function() {
	describe("connect", function() {
		var socket = new MockSocket();
		var messageBroker = new MessageBroker({
			client: socket
		});

		before(function(done) {
			messageBroker.connect(function() {
				done();
			});
		});

		it("uses the correct default hostname and port", function() {
			assert.equal(socket.getHostName(), "freechess.org");
			assert.equal(socket.getPort(), 5000);
			assert.ok(socket.isConnected());
		});
	});

	describe("receiving an incomplete message", function() {
		var messageBroker;
		var socket = new MockSocket();

		before(function() {
			messageBroker = new MessageBroker({
				client: socket
			});
		});

		it("starts with an empty message", function() {
			assert.equal(messageBroker.getMessage(), "");
		});

		it("builds up the message while not recognized", function() {
			socket.sendMessage("Fake Message\n\r");
			assert.equal("Fake Message\n\r", messageBroker.getMessage());
			socket.sendMessage("Another Fake Message\n\r");
			assert.equal("Fake Message\n\rAnother Fake Message\n\r", messageBroker.getMessage());
		});
	});
});