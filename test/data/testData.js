var assert = require("assert");
var fs = require("fs");

function TestData() {

}

TestData.prototype.read = function(name, done) {
	assert(name);
	assert(done);

	fs.readFile(__dirname + "/" + name + ".txt", "utf-8", function(err, data) {
		if (err) {
			throw err;
		}

		done(data);
	});
};

module.exports = TestData;