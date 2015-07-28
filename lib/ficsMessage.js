var FicsMessage = function(data) {

	var message = {};

	var guestConfirm = /Press return to enter the server as \"(?:[a-zA-Z]+)/;

	var match = guestConfirm.exec(data);
	if (match) {
		message.username = match[0];
		console.log("extracted username " + message.username);
	} else {
		console.log("unknown message :" + data);
	}

	return message;
};

module.exports = FicsMessage;

