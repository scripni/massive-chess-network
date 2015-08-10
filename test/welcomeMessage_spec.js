var assert = require("assert");
var fs = require("fs");
var welcomeMessage = require("../lib/welcomeMessage");

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
			var message = welcomeMessage.parse(rawMessage);
			assert.ok(message instanceof welcomeMessage.message);
		});

		it("ignores other messages", function() {
			var message = welcomeMessage.parse("fake data");
			assert.ok(message === null);
		});
	});
});