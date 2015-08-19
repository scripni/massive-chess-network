var assert = require("assert");

var regex = /\b(\w+)\(?(\w+)?\)? \(([+]{4}|\d+)\) seeking (\d+) (\d+) (\w+) ([\w\/]+)\s?\[?(\w+)?\]?\s?(m)?\s*(f)?\s?\(\"play (\d+)\" to respond\)[\r\n]+fics% [\r\n]+/;

function GameSeekMessage(args) {
	assert(args, "args required");
	assert(args.player, "player required");
	assert(args.rating, "player rating required");
	assert(args.time, "time required");
	assert(args.inc, "increment required");
	assert(args.rated, "rated required");
	assert(args.type, "type required");
	assert(args.id, "id required");

	this.player = args.player;
	if (args.rating == "++++") {
		this.rating = -1;
	}
	else {
		this.rating = Number(args.rating);
	}

	this.time = Number(args.time);
	this.handleCode = args.handleCode;
	this.inc = Number(args.inc);
	this.rated = args.rated;
	this.type = args.type;
	this.color = args.color;
	this.manual = Boolean(args.manual);
	this.formula = Boolean(args.formula);
	this.id = Number(args.id);
}

GameSeekMessage.parse = function(message) {
	assert(message, "message to parse must not be empty");
	var match = regex.exec(message);
	console.log(match);
	if (match) {
		return new GameSeekMessage({
			player : match[1],
			handleCode : match[2],
			rating : match[3],
			time : match[4],
			inc : match[5],
			rated : match[6],
			type : match[7],
			color : match[8],
			manual : match[9],
			formula : match[10],
			id : match[11]
		});	
	}

	return {};
};

module.exports = GameSeekMessage;