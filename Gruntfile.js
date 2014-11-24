/* global module */
module.exports = function(grunt) {
    grunt.initConfig({
        // Reads package.json configuration file
        pkg: grunt.file.readJSON('package.json'),

        // CSS: SASS - input/output files and other options
        sass: {
            options: {},
            project: {
                files: {
                    "App_Themes/Theme/css/main.css": "App_Themes/Theme/scss/main.scss"
                }
            }
        },
        // CSS: LESS - input output/files and other options
        less: {
            options: {},
            project: {
                files: {
                    "App_Themes/Theme/less/main.css": "App_Themes/Theme/less/main.less"
                }
            }
        },
        // CSS: Contatination - input/output files and other options
        concat: {
            options: {
                separator: '',
            },
            files: {
                src: ['App_Themes/Theme/css/main.css', 'App_Themes/Theme/less/main.css'],
                dest: 'App_Themes/Theme/css/main-joined.css',
            }
        },
        // CSS: Combine Media Queries - input/output files and other options
        cmq: {
            options: {
                log: false
            },
            project: {
                files: {
                    'App_Themes/Theme/css/combined': 'App_Themes/Theme/css/main-joined.css'
                }
            }
        },
        // CSS: Autoprefix - input/output files and other options
        autoprefixer: {
            options: {},
            project: {
                src: 'App_Themes/Theme/css/combined/main-joined.css',
                dest: 'App_Themes/Theme/css/main-prefixed.css'
            }
        },
        // CSS: Minification - input/output files and other options
        cssmin: {
            options: {
                keepSpecialComments: 0,
                banner: ''
            },
            project: {
                files: {
                    'App_Themes/Theme/css/main.min.css': 'App_Themes/Theme/css/main-prefixed.css'
                }
            }
        },
        // CSS: Bless - input/output files and other options
        bless: {
            options: {
                cacheBuster: true,
                force: true
            },
            project: {
                files: {
                    'App_Themes/Theme/css/main-blessed.css': 'App_Themes/Theme/css/main.min.css'
                }
            }
        },

        // CodeKit - input/output

        codekit: {
            options: {

            },
            project: {
                src: 'flats/views/*.kit',
                dest: 'flats',
            }
        },
        uglify: {
            options: {
                sourceMap: true
            },
            project: {
                files: {
                    'App_Themes/Theme/js/combined.js': [

                        'App_Themes/Theme/js/app.js',
                        'App_Themes/Theme/js/plugins.js',

                        'App_Themes/Theme/js/modules/*.js',

                        // 'App_Themes/Theme/js/vendor/example/example.js',

                        'App_Themes/Theme/js/main.js'
                    ]
                }
            }
        },

        // Web Server: HTTP + Live reload Port + Base URL

        connect: {
            project: {
                options: {
                    keepalive: true,
                    base: '.',
                    port: 3333,
                    livereload: 3332
                }
            }
        },

        // Watcher + Live reload port number + Set up sets of source files + associated tasks 

        watch: {
            options: {
                livereload: 3332
            },
            css: {
                files: ['**/*.scss', '**/*.less'],
                tasks: ['compile'],
            },
            codekit: {
                files: ['**/*.kit'],
                tasks: ['codekit'],
            },
            uglify: {
                files: ['App_Themes/Theme/js/**/*.js', '!App_Themes/Theme/js/combined.js'],
                tasks: ['uglify']
            }
        },

    });


    // Load Tasks

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-combine-media-queries');
    grunt.loadNpmTasks('grunt-bless');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-codekit');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');


    // Register Default Task (when running grunt without a task)

    grunt.registerTask('default', ['watch']);
    
    // Register a "Compile" Task (activate by running "grunt connect")

    grunt.registerTask('compile', 'compiles .kit,.scss, .less & .js files', function() {

        // Run each fo our compile tasks one after the other
        grunt.task.run('sass', 'less', 'concat', 'cmq', 'autoprefixer', 'cssmin', 'bless');


    });

};