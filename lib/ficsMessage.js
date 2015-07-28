var FicsMessage = function(data) {

	var message = {};

	var guestConfirm = /Press return to enter the server as \"([a-zA-Z]+)/;

	var match = guestConfirm.exec(data);
	if (match) {
		message.username = match[1];
	} else {
		// TODO: parse additional message types
	}

	return message;
};

module.exports = FicsMessage;

