module.exports = function(grunt) {
    // Load the projects configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            progressjs: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'dist/js/progress.js.map',
                    sourceMapIncludeSources: true,
                    compress: {
                        drop_console: true
                    }
                },
                files: {
                    'dist/js/progress.min.js': ['src/js/progress.js']
                }
            }
        },
        watch: {
            files: ['src/**/*.js', 'Gruntfile.js'],
            tasks: ['build']
        }
    });

    // Load the needed plugins
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build', ['uglify:progressjs']);
    grunt.registerTask('default', ['build']);
};
