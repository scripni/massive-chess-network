var assert = require("assert");
var fs = require("fs");
var AuthMessage = require("../lib/authMessage");

describe("authentication message", function() {
	describe("a successful anonymous authentication", function() {
		var authMessage;
		
		before(function(onDone) {
			fs.readFile(__dirname + "/data/authenticationAccepted.txt", "utf-8", function(err, data) {
				if (err) {
					throw err;
				}

				authMessage = new AuthMessage(data);
				onDone();
			});
		});

		it("detects the authentication message", function() {
			assert(authMessage);
		});

		it("detects the authentication is for a guest", function() {
			assert(authMessage.isGuest());
		});

		it("gets the assigned username", function() {
			assert(authMessage.getUserName(), "GuestCSTP");
		});
	});
});