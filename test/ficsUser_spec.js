var assert = require("assert");
var FicsUser = require("../lib/ficsUser");
var TelnetClient = require("../lib/telnetClient");

describe("A FICS user", function() {

	describe("A successful anonymous connection", function() {
		var user = {};
		var client = new TelnetClient();
		client.connectAsync = function(onDone) {
			client.isConnected = true;
		};

		before(function() {
			user = new FicsUser({

			});
		});

		it("signs in receiving a Guest username", function(onDone) {
			this.timeout(10000);
			user.signInAsync(function(success) {
				assert(success);
				assert(user.getUsername().indexOf("Guest") === 0);
				onDone();
			});
		});

		it("signs out if the connection is terminated", function() {

		});
	});
});
