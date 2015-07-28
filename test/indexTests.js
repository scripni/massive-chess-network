var assert = require("assert");
var TelnetClient = require("../index").telnetClient;
var FicsUser = require("../index").ficsUser;

describe("network client", function() {

	describe("default state", function() {

		var client = new TelnetClient();
		var user = new FicsUser({
			"client" : client
		});

		it("initializes the client successfully", function() {

			assert(client);

		});

		it("initializes the user successfully", function() {

			

		});

	});

});
