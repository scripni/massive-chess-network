console.log("begining FicsUser declaration");

var TelnetClient = require("./telnetClient");
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

		assert(onDone);
		assert(user.isSignedIn === false);

		user.client.connectAsync(function() {

			user.client.beginReadAsync("login", function(message) {

				if (message.contains("Welcome")) {
					user.isSignedIn = true;
					onDone(true);
				} else {
					user.isSignedIn = false;
					onDone(false);
				}
			});

		});
	};

	user.getIsSignedIn = function() {

		return isSignedIn;

	};

	return user;

};

module.exports = FicsUser;

console.log("ending FicsUser declaration");
