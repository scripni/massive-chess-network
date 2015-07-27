var assert = require("assert");
var TelnetSession = require("../lib/telnetSession");

describe("a telnet session", function() {

	describe("successfully connected to freechess.org", function() {

		var telnetSession = {};

		before(function() {

			telnetSession = new TelnetSession({

			});

		});

		it("starts from a disconnected state", function() {

			assert(telnetSession.getIsConnected() == false);

		});

		it("can initiate the connection with the server", function(done) {

			telnetSession.connectAsync(function(){}, function() {

				assert(telnetSession.getIsConnected());
				done();

			});

		});

	});

});
