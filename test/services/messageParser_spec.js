var assert = require("assert");
var MessageParser = require("../../lib/services/messageParser");

describe("Message Parser", function() {
	describe("receive a known message", function() {
		it("identifies the correct message type");
		it("returns a new message object");
	});

	describe("receive an unknown message", function() {
		it("flags the message as unknown");
		it("creates a log entry with the message");
	});
});