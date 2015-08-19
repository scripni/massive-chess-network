var assert = require("assert");
var TestData = require("./data/testData");
var GameSeekMessage = require("../lib/gameSeekMessage");

// requirements: http://www.freechess.org/Help/HelpFiles/seek.html
// Usage: seek [time inc] [rated|unrated] [white|black] [crazyhouse] [suicide]
// [wild #] [auto|manual] [formula] [rating-range]

describe("Game seek message", function() {

	describe("guest seeking 10 1 unrated white manual formula 0000-9998", function() {
		var seekMessage =
"GuestMC (++++) seeking 10 1 unrated blitz [white] m f (\"play 160\" to respond)\r\n" +
"fics% \r\n";
		var seek = {};

		before(function() {
			seek = GameSeekMessage.parse(seekMessage);
		});

		it("reads the correct player", function() {
			assert.equal(seek.player, "GuestMC", "Username should be GuestMC");
		});

		it("detects the user is unrated", function() {
			assert.equal(seek.rating, -1, "Seek should be unrated");
		});

		it("detects the time control", function() {
			assert.equal(seek.time, 10, "Time should be 10");
			assert.equal(seek.inc, 1, "Increment should be 1");
		});

		it("detects the game is unrated", function() {
			assert.equal(seek.rated, "unrated", "Seek is unrated");
		});

		it("detects the game is blitz", function() {
			assert.equal(seek.type, "blitz", "Seek should be blitz");
		});

		it("detects the seek is for white", function() {
			assert.equal(seek.color, "white", "Seek is for white");
		});

		it("detects the seek is manually accepted", function() {
			assert.equal(seek.manual, true, "Seek is manually accepted");
		});

		it("detects the seek has a formula", function() {
			assert.equal(seek.formula, true, "Seek has formula");
		});

		it("detects the seek id", function() {
			assert.equal(seek.id, 160, "Seek id is 160");
		});
	});

	describe("rated player seeking rated game without manual and formula", function() {
		var seekMessage =
"GuestMC (1234) seeking 1 2 rated crazyhouse [black] (\"play 52\" to respond)\r\n" +
"fics% \r\n";
		var seek = {};

		before(function() {
			seek = GameSeekMessage.parse(seekMessage);
		});

		it("detects the user's rating", function() {
			assert.equal(seek.rating, 1234, "Rating is 1234");
		});

		it("detects the game is rated", function() {
			assert.ok(seek.rated, "Game is rated");
		});

		it("detects the seek is not manual", function() {
			assert.equal(seek.manual, false, "Game is not manual");
		});

		it("detects the seek doesn't have a formula", function() {
			assert.equal(seek.formula, false, "Game has no formula");
		});	
	});

	describe("player with special handle code seeking wild fr game with no color specified", function() {
		var seekMessage = 
"GuestMC(C) (2345) seeking 3 0 unrated wild/fr (\"play 94\" to respond)\r\n" +
"fics% \r\n";
		var seek = {};
		before(function() {
			seek = GameSeekMessage.parse(seekMessage);
		});

		it("detects the user's handle code", function() {
			assert.equal(seek.handleCode, "C", "Handle code is C");
		});

		it("detects there is no color specified", function() {
			assert.equal(seek.color, undefined, "No color specified");
		});

		it("detects the wild/fr game type", function() {
			assert.equal(seek.type, "wild/fr", "Game type is wild/fr");
		});
	});

});