module.exports = function (grunt) {
    // Do grunt-related things in here
    grunt.initConfig({
        ngdocs: {
            options: {
                dest: 'docs',
                html5Mode: false
            },
            api: {
                src: ['frontend/js/**/*.js'],
                title: 'Documentation'
            }
        }
    });
    grunt.loadNpmTasks('grunt-ngdocs');
    grunt.registerTask('default', ['ngdocs']);


}