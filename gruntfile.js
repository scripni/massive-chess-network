module.exports = function(grunt) {

	grunt.initConfig({
		jshint : {
			files : ['./index.js', './test/*js', './spec/*js', 'lib/**/*js']
		},
		watch : {
			files : ["**/*.js"],
			tasks : ["jshint"]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
};
