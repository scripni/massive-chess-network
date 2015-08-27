var assert = require("assert");
var MessageFactory = require("../lib/messageFactory");
var TestData = require("./data/testData");

describe("a message factory", function() {
  describe("successfully parse a message", function() {
    it("creates the message if recognized");
  });

  describe("successfully parse with second parser", function() {
    it("creates the correct message type");
  });

  describe("no parser successful", function() {
    it("creates a null message");
  });

  describe("parsing a welcome message", function() {

    var messageFactory = {};
    var parsedMessage = {};

    before(function(onDone) {
      messageFactory = new MessageFactory();
      var testData = new TestData();
      testData.read("welcomeMessage", function(data) {
        parsedMessage = messageFactory.parse(data);
        onDone();
      });
    });

    it("parses the message successfully", function() {
      assert.ok(parsedMessage);
    });

    it("identifies the code", function() {
      assert.equal(parsedMessage.code, "welcome");
    });

  });

  describe("parsing a login message", function() {

    var messageFactory = {};
    var parsedMessage = {};

    before(function(onDone) {
      messageFactory = new MessageFactory();
      var testData = new TestData();
      testData.read("loginMessage", function(data) {
        parsedMessage = messageFactory.parse(data);
        onDone();
      });
    });

    it("parses the message successfully", function() {
      assert.ok(parsedMessage);
    });

    it("identifies the code", function() {
      assert.equal(parsedMessage.code, "login");
    });

  });

  describe("parsing an authentication message", function() {

    var messageFactory = {};
    var parsedMessage = {};

    before(function(onDone) {
      messageFactory = new MessageFactory();
      var testData = new TestData();
      testData.read("authenticationAccepted", function(data) {
        parsedMessage = messageFactory.parse(data);
        onDone();
      });
    });

    it("parses the message successfully", function() {
      assert.ok(parsedMessage);
    });

    it("identifies the code", function() {
      assert.equal(parsedMessage.code, "anon-auth-success");
    });

    it("extracts all fields", function() {
      assert.equal(parsedMessage.username, "GuestCSTP");
    });

  });

  describe("parsing a game seek message", function() {

    var message = "GuestMC (++++) seeking 10 1 unrated blitz [white] m f (\"play 160\" to respond)\r\n" +
      "fics% \r\n";
    var messageFactory = new MessageFactory();
    var parsedMessage = messageFactory.parse(message);

    it("parses the message successfully", function() {
      assert.ok(parsedMessage);
    });

    it("identifies the code", function() {
      assert.equal(parsedMessage.code, "game-seek");
    });

    it("reads the correct player", function() {
      assert.equal(parsedMessage.player, "GuestMC", "Username should be GuestMC");
    });

    it("detects the user is unrated", function() {
      assert.equal(parsedMessage.rating, "++++", "Seek should be unrated");
    });

    it("detects the time control", function() {
      assert.equal(parsedMessage.time, 10, "Time should be 10");
      assert.equal(parsedMessage.inc, 1, "Increment should be 1");
    });

    it("detects the game is unrated", function() {
      assert.equal(parsedMessage.rated, "unrated", "Seek is unrated");
    });

    it("detects the game is blitz", function() {
      assert.equal(parsedMessage.type, "blitz", "Seek should be blitz");
    });

    it("detects the seek is for white", function() {
      assert.equal(parsedMessage.color, "white", "Seek is for white");
    });

    it("detects the parsedMessage is manually accepted", function() {
      assert.equal(parsedMessage.manual, "m", "Seek is manually accepted");
    });

    it("detects the seek has a formula", function() {
      assert.equal(parsedMessage.formula, "f", "Seek has formula");
    });

    it("detects the seek id", function() {
      assert.equal(parsedMessage.id, 160, "Seek id is 160");
    });
  });

  describe("rated player seeking rated game without manual and formula", function() {
    var message =
"GuestMC (1234) seeking 1 2 rated crazyhouse [black] (\"play 52\" to respond)\r\n" +
"fics% \r\n";
    var messageFactory = new MessageFactory();
    var parsedMessage = messageFactory.parse(message);

    it("detects the user's rating", function() {
      assert.equal(parsedMessage.rating, 1234, "Rating is 1234");
    });

    it("detects the game is rated", function() {
      assert.ok(parsedMessage.rated, "Game is rated");
    });

    it("detects the seek is not manual", function() {
      assert.equal(parsedMessage.manual, null, "Game is not manual");
    });

    it("detects the seek doesn't have a formula", function() {
      assert.equal(parsedMessage.formula, null, "Game has no formula");
    }); 
  });

  describe("player with special handle code seeking wild fr game with no color specified", function() {
    var message = 
"GuestMC(C) (2345) seeking 3 0 unrated wild/fr (\"play 94\" to respond)\r\n" +
"fics% \r\n";
    var messageFactory = new MessageFactory();
    var parsedMessage = messageFactory.parse(message);

    it("detects the user's handle code", function() {
      assert.equal(parsedMessage.handleCode, "C", "Handle code is C");
    });

    it("detects there is no color specified", function() {
      assert.equal(parsedMessage.color, undefined, "No color specified");
    });

    it("detects the wild/fr game type", function() {
      assert.equal(parsedMessage.type, "wild/fr", "Game type is wild/fr");
    });
  });

});