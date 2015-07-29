var assert = require("assert");

var AuthResultMessage = function(args) {
	assert(args && args.message);

	var authMessage = {};
	var successRegex = /Press return to enter the server as \"([a-z0-9]+)\"/i;
	authMessage.success = false;
	authMessage.username = "";

	var match = successRegex.exec(args.message);
	if (match[1]){
		authMessage.success = true;
		authMessage.username = match[1];
		return authMessage;
	}
};

module.exports = AuthResultMessage;
