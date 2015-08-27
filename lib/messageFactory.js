var assert = require("assert");
var MessageParser = require("./messageParser");

function MessageFactory(args) {
  args = args || {};
  this.parsers = args.parsers || [
    // welcome message
    new MessageParser({
      code: "welcome",
      regex: /[\*]{4} Starting FICS session as [a-z]+\(U\) [\*]{4}(.|[\r\n])+\bfics% [\r\n]+/i,
      mappings: []
    }),
    // login message
    new MessageParser({
      code: "login",
      regex: /\bTrying\s+\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(.|[\r\n])+login:[\s\r\n]+/i,
      mappings: []
    }),
    // anonymous authentication successful message
    new MessageParser({
      code: "anon-auth-success",
      regex: /Logging you in as "([a-z]+)"; you may use this name to play unrated games.[\r\n]+\(After logging in, do "help register" for more info on how to register\.\)[\r\n]+Press return to enter the server as "\1"\:[\r\n]+/i,
      mappings: [
        "username"
      ]
    }),
    // game seek message
    new MessageParser({
      code: "game-seek",
      regex: /\b(\w+)\(?(\w+)?\)? \(([+]{4}|\d+)\) seeking (\d+) (\d+) (\w+) ([\w\/]+)\s?\[?(\w+)?\]?\s?(m)?\s*(f)?\s?\(\"play (\d+)\" to respond\)[\r\n]+fics% [\r\n]+/,
      mappings: [
        "player",
        "handleCode",
        "rating",
        "time",
        "inc",
        "rated",
        "type",
        "color",
        "manual",
        "formula",
        "id"
      ]
    })
  ];
}

MessageFactory.prototype.parse = function(data) {
  
  var message = null;
  
  // check if any parser can match the message
  this.parsers.some(function(parser) {
    message = parser.parse(data);
    if (message !== null) {
      return true;
    } else {
      return false;
    }
  });

  return message;
};

module.exports = MessageFactory;