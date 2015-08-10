var assert = require("assert");
var MessageFactory = require("../lib/messageFactory");
var MockMessage = require("./mocks/mockMessage");

describe("a message factory", function() {
	describe("successfully parse a message", function() {
		var messageFactory = new MessageFactory({
			parsers: [ MockMessage.parseSuccess ]
		});

		it("creates the message if recognized", function() {
			var message = messageFactory.parse("fake data");
			assert.ok(message instanceof MockMessage.message);
		});
	});

	describe("successfully parse with second parser", function() {
		var messageFactory = new MessageFactory({
			parsers: [ MockMessage.parseFail, MockMessage.parseSuccess ]
		});

		it("creates the correct message type", function() {
			var message = messageFactory.parse("fake data");
			assert.ok(message instanceof MockMessage.message);
		});
	});

	describe("no parser successful", function() {
		var messageFactory = new MessageFactory({
			parsers: [ MockMessage.parseFail ]
		});

		it("creates a null message", function() {
			var message = messageFactory.parse("fake data");
			assert.ok(message === null);
		});
	});
});