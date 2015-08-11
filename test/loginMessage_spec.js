var assert = require("assert");
var fs = require("fs");
var LoginMessage = require("../lib/loginMessage");

describe("login message", function() {
	describe("parsing data", function() {
		var rawMessage;
		
		before(function(onDone) {
			fs.readFile(__dirname + "/data/loginMessage.txt", "utf-8", function(err, data) {
				if (err) {
					throw err;
				}

				rawMessage = data;
				onDone();
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