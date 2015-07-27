module.exports = function(grunt) {

	grunt.initConfig({
		jshint : {
			files : ['./index.js', './test/*js', './spec/*js', 'lib/**/*js']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');

};
