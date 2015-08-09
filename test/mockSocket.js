var assert = require("assert");
var EventEmitter = require("events").EventEmitter;
var util = require("util");

var MockSocket = function() {
	// invoke the EventEmitter's constructor
	EventEmitter.call(this);

	var self = this;
	self.connected = false;

	self.connect = function(port, hostname, done){
		self.hostname = hostname;
		self.port = port;
		self.connected = true;
		done();
	};

	self.getHostName = function() {
		return self.hostname;
	};

	self.getPort = function() {
		return self.port;
	};

	self.isConnected = function() {
		return self.connected;
	};

	self.sendMessage = function(message) {
		assert(message);
		self.emit("data", message);
	};

	return self;
};

// set up inheritance
util.inherits(MockSocket, EventEmitter);
module.exports = MockSocket;