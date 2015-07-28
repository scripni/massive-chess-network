var assert = require("assert");
var TelnetClient = require("../lib/telnetClient");

describe("a telnet client", function() {

	describe("when the network is flowing like Viktor's tears when he loses at FIFA", function() {

		var telnetClient = {};
		var message = "";

		before(function() {

			telnetClient = new TelnetClient({

			});

		});

		function receivedMessage(msg) {

			message = msg;

		}

		it("is initialized in a disconnected state", function() {

			assert(telnetClient.getIsConnected() === false);

		});

		it("can initiate the connection with the server", function(onDone) {

			telnetClient.connectAsync(function() {

				assert(telnetClient.getIsConnected());
				onDone();

			});
		});

		it("receives a message", function(onDone) {

			telnetClient.beginReadAsync(function(message) {

				telnetClient.destroy();
				assert(message.length > 0);
				onDone();

			});

		});

		after(function() {

			telnetClient.destroy();
			assert(telnetClient.getIsConnected() === false);

		});

	});

});
