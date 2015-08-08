var assert = require("assert");
var MessageBroker = require("../lib/messageBroker");
var fs = require("fs");

describe("a message broker", function() {

	describe("parses an authentication response", function() {
		var loginMessage;

		before(function(onDone) {
			fs.readFile("./data/loginPrompt.txt", function(err, data) {
				loginMessage = data;
				onDone();
			});
		});

		it("parses the message", function() {
			
		});
	});

	describe("parses a welcome message", function() {

	});

	describe("parses a game seek message", function() {

	});

	describe("parses a game start message", function() {

	});

	describe("parses a game move message", function() {

	});

	describe("parses a game end message", function() {

	});

	describe("parses a global chat message", function() {

	});

	describe("parses a private chat message", function() {

	});

	describe("parses an unknown message", function() {

	});

	describe("sends an authentication message", function() {

	});

	describe("sends a game seek message", function() {

	});

	describe("sends a global chat message", function() {

	});

	describe("sends a private chat message", function() {

	});

	describe("sends a message when the receiver is unavailable", function() {

	});

	describe("sends a null message", function() {

	});
});