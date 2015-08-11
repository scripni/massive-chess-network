var assert = require("assert");
var fs = require("fs");
var AuthMessage = require("../lib/authMessage");

describe("authentication message", function() {
	describe("a successful anonymous authentication", function() {
		var message, expectedLength;
		
		before(function(onDone) {
			fs.readFile(__dirname + "/data/authenticationAccepted.txt", "utf-8", function(err, data) {
				if (err) {
					throw err;
				}

				expectedLength = data.length;
				message = AuthMessage.parse(data);
				onDone();
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