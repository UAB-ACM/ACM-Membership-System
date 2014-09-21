module.exports = function (grunt) {
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        ngdocs: {
            options: {
                dest: 'docs',
                html5Mode: false
            },
            api: {
                src: ['frontend/js/**/*.js'],
                title: 'Documentation'
            }
        },

        ngAnnotate: {
            acmApp: {
                files: [
                    {
                        expand: true,
                        src: [
                            "frontend/js/app.js",
                            "frontend/js/router.js",
                            "frontend/js/controllers/*.js",
                            "frontend/js/components/*.js",
                            "frontend/js/directives/*.js"
                        ],
                        rename: function(dest, src) {
                            return 'annotate/' + src;
                        }
                    },
                ],
            },
        },


        concat: {
            options: {
                mangle: false
            },
            dist: {
                src: [

                    "frontend/bower_components/jquery/dist/jquery.min.js",
                    "frontend/bower_components/bootstrap/dist/js/bootstrap.min.js",
                    "frontend/bower_components/angular/angular.min.js",
                    "frontend/bower_components/angular-route/angular-route.min.js",
                    "frontend/bower_components/angular-gravatar/build/md5.min.js",
                    "frontend/bower_components/angular-gravatar/build/angular-gravatar.min.js",
                    "annotate/frontend/js/**/*.js"
                ],
                dest: 'frontend/js/build/production.js',
            }
        },

        uglify: {
            build: {
                src: 'frontend/js/build/production.js',
                dest: 'frontend/js/build/production.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-ngdocs');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['ngdocs', 'ngAnnotate', 'concat', 'uglify']);
}