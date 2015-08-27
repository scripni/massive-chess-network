var assert = require("assert");
var MessageParser = require("../lib/messageParser");

describe("Message parser", function() {

	describe("Parsing a matched message with no mappings", function() {

		var messageParser = {};
		var parsedMessage = {};

		before(function() {
			messageParser = new MessageParser({
				regex: /Hello World/,
				mappings: [],
				code: "FakeMessage"
			});
		});

		it("matches the message", function() {
			parsedMessage = messageParser.parse("Hello World");
			assert.ok(parsedMessage);
		});

		it("returns the correct code", function() {
			assert.equal(parsedMessage.code, "FakeMessage");
		});

		it("returns the correct message channel", function() {
			assert.equal(parsedMessage.channel, "FakeMessage-channel");
		});
	});

	describe("Parsing a matched message with mappings", function() {
 
		var messageParser = {};
		var parsedMessage = {};

		before(function() {
			messageParser = new MessageParser({
				regex: /([a-z]+) ([a-z]+)/i,
				mappings: [
					"firstMapping",
					"secondMapping"
				],
				code: "FakeMessage"
			});
		});

		it("matches the message", function() {
			parsedMessage = messageParser.parse("Hello World");
			assert.ok(parsedMessage);
		});

		it("sets the mappings", function() {
			assert.equal(parsedMessage.firstMapping, "Hello");
			assert.equal(parsedMessage.secondMapping, "World");
		});

	});

	describe("Parsing an unmatched message", function() {

		var messageParser = {};

		before(function() {
			messageParser = new MessageParser({
				regex: /Foo/,
				mappings: [],
				code: "FakeMessage"
			});
		});

		it("does not match the message", function() {
			assert.ok(messageParser.parse("Bar") === null);
		});

	});

});