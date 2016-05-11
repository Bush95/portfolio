module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "dev/css/main.css": "dev/less/main.less"
                }
            }
        },
        autoprefixer: {
                options: {
                    browsers: ['last 2 versions', 'ie 6', 'ie 7', 'ie 8', 'ie 9', 'Firefox >= 20', 'iOS 7', 'Firefox ESR', 'last 5 Opera versions', 'last 5 op_mini versions', 'last 5 op_mob versions', 'last 5 and_chr versions']
                },
                    'dev/css/mainprefixed.css': 'dev/css/main.css'
        },
        cssmin: {
            compress: {
                files: {
                    'dest/css/main.min.css': 'dev/css/mainprefixed.css'
                }
            }
        },
        watch: {
            less: {
                files: 'dev/less/*.less',
                tasks: ['less', 'autoprefixer', 'cssmin']
            },
            source: {
                files: ['dev/index.html', 'dev/mailer.php', 'dev/js/script.js'],
                tasks: 'copy'
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'dev',
                        src: ['projects/**', 'mailer.php', 'index.html', 'js/**', 'images/**', 'css/reset.css', 'phpMailer/**'],
                        dest: 'dest/'
                    }
                ]
            },
        },
    });


    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['less', 'autoprefixer', 'cssmin', 'copy', 'watch']);
    grunt.registerTask('copyfiles', 'copy');
}