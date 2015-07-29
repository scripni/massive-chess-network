var assert = require("assert");

var FicsUser = function(args) {

	var user = {};
	args = args || {};

	// FICS automatically assigns a Guest**** username if signing in as 'g'
	user.name = args.name || "g";
	user.password = args.password || "";
	user.isSignedIn = false;

	user.signInAsync = function(onDone) {
		assert(onDone && user.isSignedIn === false);
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