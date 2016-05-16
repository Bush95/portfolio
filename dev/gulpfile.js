var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    LessAutoprefix = require('less-plugin-autoprefix'),
    server = require('gulp-server-livereload'),
    fs = require('fs'),
    image = require('gulp-image'),
    autoprefix = new LessAutoprefix({
        browsers: ['last 6 versions', '> 2%']
    }),
    copy = function (src, dest) {
        fs.createReadStream(src).pipe(fs.createWriteStream(dest));
    };

gulp.task('copyfiles', function () {
    copy('index.html', '../dist/index.html');
    copy('css/reset.css', '../dist/css/reset.css');
});

gulp.task('minjs', function () {
    gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('../dist/js'))
});

gulp.task('less', function () {
    gulp.src('less/main.less')
        .pipe(less({
            compress: true,
            plugins: [autoprefix]
        }))
        .pipe(gulp.dest('../dist/css/'))
});

gulp.task('image', function () {
    gulp.src('images/**/*')
        .pipe(image({
            pngquant: true,
            optipng: false,
            zopflipng: true,
            advpng: true,
            jpegRecompress: false,
            jpegoptim: true,
            mozjpeg: true,
            gifsicle: true,
            svgo: true
        }))
        .pipe(gulp.dest('../dist/images'));
});

gulp.task('watch', function () {
    gulp.watch('js/*.js', ['minjs']);
    gulp.watch('less/**/*.less', ['less']);
    gulp.watch('index.html', ['copyfiles']);
});

gulp.task('webserver', function () {
    gulp.src('../dist')
        .pipe(server({
            livereload: true,
            directoryListing: true,
            open: true
        }));
});

gulp.task('default', ['minjs', 'less', 'watch', 'webserver']);