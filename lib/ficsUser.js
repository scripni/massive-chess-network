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


	user.signInAsync = function(onNext) {

		assert(onNext);
		assert(isSignedIn === false);
		
		user.client.connectAsync(onNext);
	};

	user.getIsSignedIn = function() {

		return isSignedIn;

	};

};

module.exports = FicsUser;

console.log("ending FicsUser declaration");
