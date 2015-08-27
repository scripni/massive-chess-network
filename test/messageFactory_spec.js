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

});