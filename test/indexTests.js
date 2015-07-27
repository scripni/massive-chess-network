var assert = require("assert");
var network = require("../index");

describe("network client", function() {

	describe("default state", function() {

		it("runs successfully", function() {

			assert(network());

		});

	});

});
