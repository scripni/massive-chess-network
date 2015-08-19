var assert = require("assert");
var TestData = require("./data/testData");
var AuthMessage = require("../lib/authMessage");

describe("authentication message", function() {
	describe("a successful anonymous authentication", function() {
		var message, expectedLength;
		
		before(function(done) {
			var testData = new TestData();
			testData.read("authenticationAccepted", function(data) {
				expectedLength = data.length;
				message = AuthMessage.parse(data);
				done();
			});
		});

		it("has the correct type", function() {
			assert.ok(message instanceof AuthMessage);
		});

		it("detects the message is for a guest", function() {
			assert.ok(message.isGuest());
		});

		it("reads the correct username", function() {
			assert(message.getUserName(), "GuestCSTP");
		});

		it("detects the start and end of the message", function() {
			assert.ok(message.index === 0);
			assert.ok(message.length === expectedLength);
		});
	});
});