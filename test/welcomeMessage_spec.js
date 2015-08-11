var assert = require("assert");
var fs = require("fs");
var WelcomeMessage = require("../lib/welcomeMessage");

describe("welcome message", function() {
	describe("parsing data", function() {
		var rawMessage;
		
		before(function(onDone) {
			fs.readFile(__dirname + "/data/welcomeMessage.txt", "utf-8", function(err, data) {
				if (err) {
					throw err;
				}

				rawMessage = data;
				onDone();
			});
		});

		it("detects the welcome message", function() {
			var message = WelcomeMessage.parse(rawMessage);
			assert.ok(message instanceof WelcomeMessage);
		});

		it("ignores other messages", function() {
			var message = WelcomeMessage.parse("fake data");
			assert.ok(message === null);
		});
	});
});