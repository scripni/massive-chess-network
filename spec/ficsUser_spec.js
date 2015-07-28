var assert = require("assert");
var FicsUser = require("../lib/ficsUser");

describe("A FICS user", function() {

	describe("A successful anonymous connection", function() {

	        var user = {};

        	before(function() {

			user = new FicsUser();

		});


		it("signs in when no username is specified", function(onDone) {

			this.timeout(5000);
			user.signInAsync(function(success) {
				assert(success);
				onDone();
			});

		});

	});

});
