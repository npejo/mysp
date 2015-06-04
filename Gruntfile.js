'use strict';

module.exports = function (grunt) {

    var config = {
        'tmp': '.tmp',
        'src': 'src',
        'scripts': 'src/javascript',
        'styles': 'src/stylesheet',
        'images': 'src/images',
        'dist': 'dist',
        'distJs': 'dist/javascript'
    };

    // Project configuration.
    grunt.initConfig({
        cfg: config,
        connect: {
            dev: {
                options: {
                    port: 8888,
                    open: true,
                    keepalive: 1,
                    base: '<%= cfg.src %>'
                }
            },
            prod: {
                options: {
                    port: 8484,
                    open: true,
                    keepalive: 1,
                    base: '<%= cfg.dist %>'
                }
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= cfg.dist %>/*',
                        '!<%= cfg.dist %>/.git*'
                    ]
                }]
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= cfg.src %>',
                        dest: '<%= cfg.dist %>',
                        src: [
                            'images/**/*',
                            'stylesheet/**/*',
                            'auth-callback.html'
                        ]
                    }
                ]
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
                files: {
                    '<%= cfg.tmp %>/app-main.js': [
                        '<%= cfg.scripts %>/utils/**/*.js',
                        '<%= cfg.scripts %>/models/**/*.js',
                        '<%= cfg.scripts %>/views/CoreView.js',
                        '<%= cfg.scripts %>/views/LoggerView.js',
                        '<%= cfg.scripts %>/views/PlayerView.js',
                        '<%= cfg.scripts %>/views/AppView.js',
                        '<%= cfg.scripts %>/views/LoginView.js',
                        '<%= cfg.scripts %>/views/menu/**/*.js',
                        '<%= cfg.scripts %>/views/content/**/*.js',
                        '<%= cfg.scripts %>/app-views-config.js',
                        '<%= cfg.scripts %>/app-run.js'
                    ],
                    '<%= cfg.distJs %>/app-config.js': [
                        '<%= cfg.scripts %>/app-initialize.js',
                        '<%= cfg.scripts %>/app-config-prod.js'
                    ]
                }
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            dist: {
                files: {
                    '<%= cfg.distJs %>/app-main.min.js': '<%= cfg.tmp %>/app-main.js'
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
        concurrent: {
            dev: {
                tasks: ['connect:dev', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        mocha: {
            options: {
                run: true
            },
            all: {
                src: ['tests/testsrunner.html']
            }
        }
    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-mocha');

    // Tasks
    grunt.registerTask('server:dev', ['concurrent:dev']);
    grunt.registerTask('server:prod', ['connect:prod']);
    grunt.registerTask('build', ['clean', 'copy', 'concat:dist', 'uglify:dist', 'processhtml:dist']);
    grunt.registerTask('test', ['mocha']);

};