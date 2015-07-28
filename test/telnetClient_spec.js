var assert = require("assert");
var TelnetClient = require("../lib/telnetClient");

describe("a telnet client to freechess.org", function() {

	// when the network is flowing like Viktor's tears when he loses at FIFA
	describe("read an anonymous authentication fragment", function() {
		var telnetClient = {};
		before(function() {
			telnetClient = new TelnetClient({
				connect: function(port, hostname, onDone) {
					onDone();
				},
				on: function(event, onNext) {
					if (event === "data") {
						onNext("");
					}
				}
			});
		});

		it("is initialized in a disconnected state", function() {
			assert(telnetClient.getIsConnected() === false);
		});

		it("can initiate the connection with the server", function(onDone) {
			this.timeout(5000);
			telnetClient.connectAsync(function() {
				assert(telnetClient.getIsConnected());
				onDone();
			});
		});

		it("receives a message", function(onDone) {
			this.timeout(5000);
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

