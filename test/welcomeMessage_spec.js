var assert = require("assert");
var fs = require("fs");
var WelcomeMessage = require("../lib/welcomeMessage");

describe("welcome message", function() {
	describe("a successful connection", function() {
		var welcomeMessage;
		
		before(function(onDone) {
			fs.readFile(__dirname + "/data/welcomeMessage.txt", "utf-8", function(err, data) {
				if (err) {
					throw err;
				}

				welcomeMessage = new WelcomeMessage(data);
				onDone();
			});
		});

		it("detects the welcome message", function() {
			assert(welcomeMessage);
		});

		it("detects that the connection was successful", function() {
			assert(welcomeMessage.isSuccessful);
		});
	});
});