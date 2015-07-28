console.log("begining massive-chess-network initialization");

var TelnetClient = require("./lib/telnetClient");
var FicsUser = require("./lib/ficsUser");

module.exports = {};

module.exports.telnetClient = TelnetClient;
module.exports.ficsUser = FicsUser;

console.log("ending massive-chess-network initialization");
