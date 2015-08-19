module.exports = function(grunt) {

	grunt.initConfig({
		jshint : {
			all : ["*.js", "test/**/*.js", "lib/**/*.js"]
		},
		watch : {
			files : ["*.js", "test/**/*.js", "lib/**/*.js"],
			tasks : ["jshint", "mochaTest"]
		},
		mochaTest : {
			test : {
				src : ["test/**/*.js"]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-mocha-test');
};
