var assert = require("assert");
var fs = require("fs");
var WelcomeMessage = require("../lib/welcomeMessage");

describe("welcome message", function() {
	describe("parsing data", function() {
		var message, expectedLength;

		before(function(onDone) {
			fs.readFile(__dirname + "/data/welcomeMessage.txt", "utf-8", function(err, data) {
				if (err) {
					throw err;
				}

				message = WelcomeMessage.parse(data);
				expectedLength = data.length;
				onDone();
			});
		});

		it("detects the welcome message", function() {
			assert.ok(message instanceof WelcomeMessage);
			assert.ok(message.index === 0);
			assert.ok(message.length === expectedLength);
		});

		it("ignores other messages", function() {
			var message = WelcomeMessage.parse("fake data");
			assert.ok(message === null);
		});
	});
});