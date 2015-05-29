'use strict';

module.exports = function (grunt) {

    var config = {
        tmp: '.tmp',
        src: 'src',
        scripts: 'javascript',
        dist: 'dist',
        distCss: 'dist/stylesheets',
        distJs: 'dist/javascript',
        bower: 'src/bower_components'

    };

    // Project configuration.
    grunt.initConfig({
        cfg: config,
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            styles: {
                expand: true,
                cwd: '<%= cfg.tmp %>',
                dest: '<%= cfg.distCss %>',
                src: ['*.css', '*.map']
            }
        },
        watch: {
            scripts: {
                files: ['<%= cfg.scripts %>/**/*.js'],
                options: {
                    debounceDelay: 250,
                    livereload: true
                }
            }
        },
        concat: {
            dist: {
                src: [
                    '<%= cfg.bower %>/jquery/dist/jquery.min.js',
                    '<%= cfg.bower %>/underscore/underscore-min.js',
                    '<%= cfg.bower %>/backbone/backbone-min.js',
                    '<%= cfg.scripts %>/app-config.js',
                    '<%= cfg.scripts %>/app-initialize.js',
                    '<%= cfg.scripts %>/models/**/*.js',
                    '<%= cfg.scripts %>/collections/**/*.js',
                    '<%= cfg.scripts %>/views/**/*.js'
                ],
                dest: '<%= cfg.tmp %>/main.js'
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            dist: {
                files: {
                    '<%= cfg.distJs %>/main.min.js': '<%= cfg.tmp %>/main.js'
                }
            }
        },
        processhtml: {
            dist: {
                files: {
                    '<%= cfg.dist %>/index.html': '<%= cfg.src %>/index.html'
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 8000,
                    open: true,
                    keepalive: 1
                }
            }
        },
        concurrent: {
            target: {
                tasks: ['connect:server', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-concurrent');

    // Tasks
    grunt.registerTask('default', ['concurrent:target']);

};