var assert = require("assert");
var FicsMessage = require("../lib/ficsMessage");

describe("a message from FICS", function() {
	describe("a welcome message", function() {
		var message = {};

		before(function() {
			message = new FicsMessage(
				"Logging you in as \"GuestFXQV\"; you may use this name to play unrated games.\n" +
				"(After logging in, do \"help register\" for more info on how to register.)\n" + 
				"Press return to enter the server as \"GuestFXQV\":");
		});

		it("extracts the username from the message string", function() {
			assert(message.username === "GuestFXQV");
		});

	});

});