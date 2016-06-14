module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// compile less stylesheets to css -----------------------------------------
	    less: {
	      build: {
	        files: {
	          'dist/css/app.css': 'app/css/app.less'
	        }
	      }
	    },
		// configure cssmin to minify css files ------------------------------------
		cssmin: {
			options: {
				banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n',
			},
			build: {
				files: {
					'dist/css/app.min.css': 'dist/css/app.css',
				},
			},
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
			},
			build: {
				files: {'dist/js/app.min.js': 'app/js/app.js'},
			},
		},
		watch: {
            all: {
                files: ['app/css/**/*.less'],
                tasks: ['less','cssmin','uglify'],
            },
        },
	});

	// ===========================================================================
	// LOAD GRUNT PLUGINS ========================================================
	// ===========================================================================
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['less','cssmin','uglify','watch',]);

};