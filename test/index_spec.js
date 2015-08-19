var assert = require("assert");
var module = require("../index");

describe("the network module", function() {
	it("exports a message broker", function() {
		var MessageBroker = module.messageBroker;
		assert.ok(MessageBroker);
	});

	it("exports a message factory", function() {
		var MessageFactory = module.messageFactory;
		assert.ok(MessageFactory);
	});
});