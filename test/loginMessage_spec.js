var assert = require("assert");
var TestData = require("./data/testData");
var LoginMessage = require("../lib/loginMessage");

describe("login message", function() {
	describe("parsing data", function() {
		var rawMessage;
		
		before(function(done) {
			var testData = new TestData();
			testData.read("loginMessage", function(data) {
				rawMessage = data;
				done();
			});
		});

		it("detects the login message", function() {
			var message = LoginMessage.parse(rawMessage);
			assert.ok(message instanceof LoginMessage);
		});

		it("ignores other messages", function() {
			var message = LoginMessage.parse("fake data");
			assert.ok(message === null);
		});
	});
});