var assert = require("assert");
var MessageBroker = require("../lib/messageBroker");
var MockSocket = require("./mocks/mockSocket");
var MessageFactory = require("../lib/messageFactory");
var MessageParser = require("../lib/messageParser");

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
		var parser = new MessageParser({
				regex: /Foo/,
				mappings: [],
				code: "FakeMessage"
			});

		var messageFactory = new MessageFactory({
			parsers: [ parser ]
		});

		var receivedMessage = null;

		before(function() {
			messageBroker = new MessageBroker({
				client: socket,
				messageFactory: messageFactory
			});

			messageBroker.on(parser.channel, function(msg) {
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

		var parser = new MessageParser({
				regex: /Foo/,
				mappings: [],
				code: "FakeMessage"
			});

		var messageFactory = new MessageFactory({
			parsers: [ parser ]
		});

		before(function() {
			// create the message broker
			messageBroker = new MessageBroker({
				client: socket,
				messageFactory: messageFactory
			});

			// listen for messages
			messageBroker.on(parser.channel, function(msg) {
				receivedMessage = msg;
			});

			// send a message expected to be parsed
			socket.sendMessage("Foo");
		});

		it("creates the message when recognized", function() {
			assert.ok(receivedMessage);
		});

		it("resets the inner message", function() {
			assert.equal(messageBroker.getMessage(), "");
		});
	});

	describe("receiving a complete message followed by an incomplete message", function() {
		var messageBroker;
		var socket = new MockSocket();
		var receivedMessage = null;

		var parser = new MessageParser({
				regex: /Foo/,
				mappings: [],
				code: "FakeMessage"
			});

		var messageFactory = new MessageFactory({
			parsers: [ parser ]
		});

		before(function() {
			messageBroker = new MessageBroker({
				client: socket,
				messageFactory: messageFactory
			});

			messageBroker.on(parser.channel, function(msg) {
				receivedMessage = msg;
			});

			socket.emit("data", "FooBar");
		});

		it("creates the message", function() {
			assert.ok(receivedMessage);
		});

		it("only removes the matched message from the inner message buffer", function() {
			assert.equal(messageBroker.getMessage(), "Bar");
		});
	});
});