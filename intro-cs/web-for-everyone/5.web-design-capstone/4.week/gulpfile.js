process.env.NODE_ENV = 'development';
//process.env.NODE_ENV = 'production';
const path = require('path');


const {
    src,
    dest,
    series,
    watch,
} = require("gulp");

const clean = require('gulp-clean');

const $ = require("gulp-load-plugins")();


const browserSync = require("browser-sync").create();
const rename = require("gulp-rename");
const Server = require('karma').Server;



// HTML task
const pug = require("gulp-pug");
const htmlmin = require("gulp-htmlmin");
const htmlhint = require("gulp-htmlhint");

// Style Task
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const csscomb = require("gulp-csscomb");

sass.compiler = require("node-sass");

const autoprefixer = require("gulp-autoprefixer");
const validate = require('gulp-w3c-css');



// js
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");
const pipeline = require("readable-stream").pipeline;
const eslint = require("gulp-eslint");

const imagemin = require('gulp-imagemin');
const jsdoc = require('gulp-jsdoc3');
//const mocha = require('gulp-mocha');


/* DEVELOPMENT */

/* HTML */
function developmentBuildHTML() {
    return src("src/pug/**/*.pug")
        .pipe(pug())
        .pipe(dest("src/"));
}

function developmentHtmlValidate() {
    return src("src/*.html")
        .pipe(htmlhint())
        .pipe(htmlhint.reporter())
        .pipe(htmlhint.failAfterError());
}

/* CSS */
var cssDevDstPath = path.join(__dirname, 'log/css/');
var cssDevSrcPath = path.join(__dirname, 'src/css/*.css');

function developmentCSS() {
    return src(["node_modules/bootstrap/scss/bootstrap.scss", "src/scss/*.scss"])
        .pipe(sass())
        .pipe(sass().on("error", sass.logError))
        .pipe(
            autoprefixer([
                "Android 2.3",
                "Android >= 4",
                "Chrome >= 20",
                "Firefox >= 24",
                "Explorer >= 8",
                "iOS >= 6",
                "Opera >= 12",
                "Safari >= 6",
            ])
        )
        .pipe(csscomb())
        .pipe(dest("src/css"))
        .pipe(browserSync.stream());
}

function CSSValidate() {
    return src(cssDevSrcPath)
        .pipe(validate())
        .pipe(rename(function(path) {
            // Updates the object in-place
            path.dirname += "/log";
            path.extname = ".json";
        }))
        .pipe(dest(cssDevDstPath));
}

/* JS */
function developmentConcatJS() {
    return src("src/js/modules/*.js")
        .pipe(sourcemaps.init())
        .pipe(concat("app.min.js"))
        .pipe(sourcemaps.write())
        .pipe(dest("src/js/"))
        .pipe(browserSync.stream());
}

function developmentJSValidate() {
    return (
        src(["src/js/modules/*.js"])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint()) // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format()) // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError())
    );
}

function fetchDependencies() {
    return pipeline(
        src([
            "node_modules/bootstrap/dist/js/bootstrap.min.js",
            "node_modules/jquery/dist/jquery.min.js",
            "node_modules/popper.js/dist/popper.min.js",
        ]),
        dest("src/js/dependencies/")
    );
}


/** BUILD SECTION */
function cleanBuild() {
    return src('build/public/', { read: false })
        .pipe(clean());

}

function buildMinifyHTML() {
    return src('src/pug/*.pug')
        .pipe(pug())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('build/public/'))
}

function buildHtmlValidate() {
    return src("src/public/*.html")
        .pipe(htmlhint())
        .pipe(htmlhint.reporter())
        .pipe(htmlhint.failAfterError())
}

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
        .pipe(dest("build/public/css"))

}

function fetchBuildDependencies() {
    return pipeline(
        src([
            "node_modules/bootstrap/dist/js/bootstrap.min.js",
            "node_modules/jquery/dist/jquery.min.js",
            "node_modules/popper.js/dist/popper.min.js"
        ]),
        dest("build/public/js/dependencies/")
    );
}

function buildConcatJS() {
    return src("src/js/modules/*.js")
        .pipe(sourcemaps.init())
        .pipe(concat("app.min.js"))
        .pipe(uglify())
        .pipe(sourcemaps.write())

    .pipe(dest("build/public/js/"))
        .pipe(browserSync.stream());
}

function generateJSdoc(cb) {

    return src([
        'README.md', 'src/js/**/*.js'
    ], { read: false }).pipe(jsdoc(cb));
    cb()
}

function optimizeImages() {
    return src(['src/assets/**/*.jpg', 'src/assets/**/*.png'])
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ progressive: true, quality: 75 }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [{
                    removeViewBox: true
                }, {
                    cleanupIDs: false
                }]
            })
        ], { verbose: true }))
        .pipe(dest('build/public/img'));

}

/** DEVELOPMENT */
function watchProject() {
    browserSync.init({ server: { baseDir: "src/" } });
    // Run Style

    watch(
        ["node_modules/bootstrap/scss/bootstrap.scss", "src/scss/**/*.scss"],        
        developmentCSS)
  
 
    watch("src/pug/**/*.pug", developmentBuildHTML);
    watch("src/pug/**/*.pug", developmentHtmlValidate);
    watch("src/pug/**/*.pug").on("change", browserSync.reload);
    //watch(["src/js/modules/**/*.js"], developmentConcatJS);
    //watch(["src/js/modules/**/*.js"], developmentJSValidate);
    //watch("src/js/modules/*.js").on("change", browserSync.reload);
}

/* TESTING */
function karmaTest(done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false
    }, done).start();
}



if (process.env.NODE_ENV === 'production') {
    exports.build = series(
        cleanBuild,
        buildMinifyHTML,
        buildHtmlValidate,
        buildCss,
        CSSValidate,
        fetchBuildDependencies,
        buildConcatJS,
        optimizeImages,
        generateJSdoc

    );

} else {
    exports.build = series(
        developmentBuildHTML,
        developmentHtmlValidate,
        developmentCSS,
        CSSValidate,
        developmentConcatJS,
        developmentJSValidate,
        fetchDependencies,
        karmaTest
    );




    exports.devJS = series(fetchDependencies, developmentConcatJS, developmentJSValidate);

    exports.validate = series(developmentHtmlValidate, CSSValidate, developmentJSValidate)
    exports.karmaTest = karmaTest;

    exports.generateJSdoc = generateJSdoc;
    exports.optimizeImages = optimizeImages;



    exports.developmentHtmlValidate = developmentHtmlValidate;
    exports.developmentJSValidate = developmentJSValidate;
    exports.CSSValidate = CSSValidate;


    exports.developmentConcatJS = developmentConcatJS;
    exports.developmentCSS = developmentCSS;
    exports.watch = watchProject;
        exports.buildPug = developmentBuildHTML;

}