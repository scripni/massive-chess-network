var TelnetClient = require("./telnetClient");
var FicsMessage = require("./ficsMessage");
var assert = require("assert");

var FicsUser = function(args) {

	var user = {};
	args = args || {};

	// FICS automatically assigns a Guest**** username if signing in as 'g'
	user.name = args.name || "g";
	user.password = args.password || "";
	user.isSignedIn = false;
	user.client = args.client || new TelnetClient();

	user.signInAsync = function(onDone) {
		console.log("begin sign in");
		assert(onDone && user.isSignedIn === false);

		// connect to server
		user.client.connectAsync(function() {

			// once connected, write the username			
			user.client.writeLineAsync(user.name + "\n", function() {
				console.log("sent authentication message");

				// read response to determine if the server accepted our authentication
				user.client.beginReadAsync(function(message) {
					console.log("reading incoming message");
					var ficsMessage = new FicsMessage(message);
					if (ficsMessage.username) {
						console.log("successfully authenticated as " + ficsMessage.username);
						user.username = ficsMessage.username;
						onDone(true);
					} else {
						// TODO: read failed authentication message
					}
				});
			});
		});
	};

	user.getIsSignedIn = function() {
		return user.isSignedIn;
	};

	user.getUsername = function() {
		return user.username;
	};

	return user;
};

module.exports = FicsUser;