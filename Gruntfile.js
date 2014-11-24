/* global module */
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            options: {},
            project: {
                files: {
                    "App_Themes/Theme/css/main.css": "App_Themes/Theme/scss/main.scss"
                }
            }
        },
        less: {
            options: {},
            project: {
                files: {
                    "App_Themes/Theme/less/main.css": "App_Themes/Theme/less/main.less"
                }
            }
        },
        concat: {
            options: {
                separator: '',
            },
            files: {
                src: ['App_Themes/Theme/css/main.css', 'App_Themes/Theme/less/main.css'],
                dest: 'App_Themes/Theme/css/main-joined.css',
            }
        },
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
        autoprefixer: {
            options: {},
            project: {
                src: 'App_Themes/Theme/css/combined/main-joined.css',
                dest: 'App_Themes/Theme/css/main-prefixed.css'
            }
        },
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
        connect: {
            propject: {
                options: {
                    keepalive: true,
                    base: '.',
                    port: 3333,
                    livereload: 3332
                }
            }
        },
        watch: {
            options: {
                livereload: 3332
            },

            less: {
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
    });


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

    grunt.registerTask('default', ['watch']);
    
    grunt.registerTask('compile', 'compiles .kit,.scss, .less & .js files', function() {

        grunt.task.run('sass', 'less', 'concat', 'cmq', 'autoprefixer', 'cssmin', 'bless');


    });

};