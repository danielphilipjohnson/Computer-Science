// Production
var cssBuildDstPath = path.join(__dirname, 'build/css/');
var cssBuildSrcPath = path.join(__dirname, 'src/css/*.css');

var validate = require('gulp-w3c-css');

// BUILD
function buildMinifyHTML() {
    return src('src/pug/**/*.pug')
        .pipe(pug())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('build/public/'))
}

// BUILD
function htmlValidate() {
    return src("src/public/*.html")
        .pipe(htmlhint())
        .pipe(htmlhint.reporter())
        .pipe(htmlhint.failAfterError())
}

function cssValidate() {
    return src(cssBuildSrcPath)
        .pipe(validate())
        .pipe(gulp.dest(cssBuildDstPath));
}





// mix between build and development
function buildCss() {
    return src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(sass().on('error', sass.logError))
        .pipe($.autoprefixer([
            'Android 2.3',
            'Android >= 4',
            'Chrome >= 20',
            'Firefox >= 24', // Firefox 24 is the latest ESR
            'Explorer >= 8',
            'iOS >= 6',
            'Opera >= 12',
            'Safari >= 6'
        ]))
        .pipe(csscomb())
        // MINIFY
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(dest("public/css"))

}


exports.development = parallel(buildHtml, style)



exports.build = parallel(htmlValidate, minifyHTML);