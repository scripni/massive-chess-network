function WelcomeMessage() {
}

var regexp = /^[\*]{4} Starting FICS session as [a-z]+\(U\) [\*]{4}$/im;
var messageEndRegexp = /^fics%\s*$/m;

WelcomeMessage.parse = function(data) {
	var match = regexp.exec(data);
	if (match) {
		// expect a 'fics% ' delimiter after the welcome message,
		// marking the message as complete
		messageEnd = messageEndRegexp.exec(data);
		if (messageEnd && messageEnd.index > match.index) {
			return new WelcomeMessage();
		}
	}

	return null;
};

module.exports = WelcomeMessage;