var assert = require("assert");
var MessageBroker = require("../lib/messageBroker");
var MockSocket = require("./mocks/mockSocket");
var MessageFactory = require("../lib/messageFactory");
var MockMessage = require("./mocks/mockMessage");

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
		var messageFactory = new MessageFactory({
			parsers: [ MockMessage.parseFail ]
		});
		var receivedMessage = null;

		before(function() {
			messageBroker = new MessageBroker({
				client: socket,
				messageFactory: messageFactory
			});

			messageBroker.on(MockMessage.channel, function(msg) {
				receivedMessage = msg;
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

		it("does not broadcast any message", function() {
			assert.ok(receivedMessage === null);
		});
	});

	describe("receiving a complete message", function() {
		var messageBroker;
		var socket = new MockSocket();
		var receivedMessage = null;

		before(function() {
			// create the message broker
			messageBroker = new MessageBroker({
				client: socket,
				messageFactory: new MessageFactory({
					parsers: [ MockMessage.parseSuccess ]
				})
			});

			// listen for messages
			messageBroker.on(MockMessage.getChannel(), function(msg) {
				receivedMessage = msg;
			});

			// send a message expected to be parsed
			socket.sendMessage("A Valid Message\n\r");
		});

		it("creates the message when recognized", function() {
			assert.ok(receivedMessage instanceof MockMessage);
		});

		it("resets the inner message", function() {
			assert.ok(messageBroker.getMessage() === "");
		});
	});

	describe("receiving a complete message followed by an incomplete message", function() {
		var messageBroker;
		var socket = new MockSocket();
		var matchedMessage = "A Fake Message\r\n";
		var partialMessage = "Another message\r\n";
		var receivedMessage = null;

		before(function() {
			messageBroker = new MessageBroker({
				client: socket,
				messageFactory: new MessageFactory({
					parsers: [ MockMessage.parseRegex(/\bA Fake Message[\r\n]+/) ]
				})
			});

			messageBroker.on(MockMessage.getChannel(), function(msg) {
				receivedMessage = msg;
			});

			socket.emit("data", matchedMessage + partialMessage);
		});

		it("creates the message", function() {
			assert.ok(receivedMessage instanceof MockMessage);
		});

		it("only removes the matched message from the inner message buffer", function() {
			assert.ok(messageBroker.getMessage() === partialMessage);
		});
	});
});