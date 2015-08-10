var assert = require("assert");
var fs = require("fs");
var authMessage = require("../lib/authMessage");

describe("authentication message", function() {
	describe("a successful anonymous authentication", function() {
		var rawMessage;
		
		before(function(onDone) {
			fs.readFile(__dirname + "/data/authenticationAccepted.txt", "utf-8", function(err, data) {
				if (err) {
					throw err;
				}

				rawMessage = data;
				onDone();
			});
		});

		it("detects the authentication message", function() {
			var message = authMessage.parse(rawMessage);
			
			// has the correct type
			assert.ok(message instanceof authMessage.message);
			
			// detects the message is for a guest
			assert.ok(message.isGuest());
			
			// reads the correct username
			assert(message.getUserName(), "GuestCSTP");
		});
	});
});