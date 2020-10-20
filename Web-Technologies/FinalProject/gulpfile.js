var gulp = require('gulp');

// HTML task
var pug = require('gulp-pug');
var htmlmin = require('gulp-htmlmin');
var htmlhint = require("gulp-htmlhint");

// Style Task
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-csso');
var csslint = require('gulp-csslint');
var csscomb = require('gulp-csscomb');

// Responsive Image Task
var imagemin = require('gulp-imagemin');


// Javascript Task
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var pump = require('pump');

// PUG-HTML TASK
gulp.task('pug', function() {
    return gulp.src('pug/*.pug')
        .pipe(pug())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('templates/'))
});

// HTML Validation TASK
gulp.task('html-validate', function() {
    return gulp.src("/*.html")
        .pipe(htmlhint())
        .pipe(htmlhint.reporter())
        .pipe(htmlhint.failAfterError())
});

// SASS TASK
// work on including
//https://github.com/browserslist/browserslist#custom-usage-data
gulp.task('sass', function() {
    return gulp.src('scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(csscomb())
        .pipe(csslint())
        .pipe(csslint.formatter())
        .pipe(minifyCSS())
        .pipe(gulp.dest('css/custom'))
});


// Responsive images
gulp.task('imagemin', () =>
    gulp.src('unresponsive-images/*')
    .pipe(imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
            plugins: [{
                removeViewBox: true
            }, {
                cleanupIDs: false
            }]
        })
    ], { verbose: true }))
    .pipe(gulp.dest('img/')));



// Compress and uglify js files Task
gulp.task('compress', function(cb) {
    pump([
        gulp.src('js/myLibrary/components/*.js'),
        uglify(),
        gulp.dest('js/myLibrary/concat/')
    ], cb);
});

// Build js Task
gulp.task('js', function() {
    return gulp.src('js/myLibrary/concat/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest('js/'))
});

gulp.task('build-html', [
    'pug',
    'html-validate'
]);

gulp.task('build-js', [
    'compress',
    'js'
]);


gulp.task('build', [
    'pug',
    'html-validate',
    'imagemin',
    'sass',
    'compress',
    'js',
]);



gulp.task('watch', function() {
    gulp.watch('scss/**/*.scss', ['sass']);
});