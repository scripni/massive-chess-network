var assert = require("assert");
var AuthResultMessage = require("../../lib/models/authResultMessage");

describe("An authentication message", function() {
	describe("A successful authentication message", function() {
		
		var message = {};

		before(function() {
			message = new AuthResultMessage({
				message: "Press return to enter the server as \"GuestFXQV\":",
			});
		});

		it("extracts the username from the message string", function() {
			assert(message.username === "GuestFXQV",
				"Successful AuthResultMessage contains the assigned username.");
		});
	});
});