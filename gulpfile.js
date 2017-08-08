var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    annotate = require('gulp-ng-annotate'),
    sourcemaps = require('gulp-sourcemaps'),
    CacheBuster = require('gulp-cachebust'),
    print = require('gulp-print'),
    babel = require('gulp-babel'),
    mainBowerFiles = require('main-bower-files'),
    replace = require('gulp-replace'),
    rename = require('gulp-rename');

var cachebust = new CacheBuster();

var paths = {
    jsSource: './client/app/**/*.js',
    jsPluginSource: './client/js/**/*',
    sassSource: './client/css/**/*.scss',
    cssSource: './client/css/**/*.css',
    cssPlugin: './client/css_plugin/**/*.css',
    viewsSource: './client/views/**/*.html',
    indexSource: './client/index.html',
    picturesSource: './client/pictures/**/*',
    fontSource: './client/fonts/**/*'
};


//jsPlugin
gulp.task('copy:jsPlugin', function () {
    return gulp.src([paths.jsPluginSource])
        .pipe(gulp.dest('./public/js'));
});

//cssPlugin
gulp.task('copy:cssPlugin', function () {
    return gulp.src([paths.cssPlugin])
        .pipe(gulp.dest('./public/css_plugin'));
});


//CSS
gulp.task('build-css', function () {
    return gulp.src(paths.cssSource)
        .pipe(sourcemaps.init())
        //Source maps is debugging thing. it's helping us to read.
        .pipe(concat('styles.css'))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./public'));
});


//SASS task, this compiles and compresses from SCSS fiels to a css file
gulp.task('sass', function () {
    return gulp.src(paths.sassSource)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cachebust.resources())
        .pipe(concat('bundle.css'))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./public'));
});

//JS task This will convert all ES6 to ES5
//This compile and compress all js files in to one
gulp.task('js', function () {
    return gulp.src(paths.jsSource)
        .pipe(sourcemaps.init())
        .pipe(print())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('bundle.js'))
        .pipe(annotate())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public'));
});

//this task will compress all of your views but will not compile them into one.
gulp.task('views', function () {
    gulp.src(paths.viewsSource)
        .pipe(gulp.dest("./public/views"));
});

//This task makes a copy of your index.html and compresses it and moves it to the dist folder
gulp.task('index', function () {
    gulp.src(paths.indexSource)
        .pipe(gulp.dest("./public"));
});

//this task copies all your pictures over to the dist folder.
gulp.task('pictures', function () {
    gulp.src(paths.picturesSource)
        .pipe(gulp.dest("./public/pictures"));
});

gulp.task('copy:fonts', function () {
    return gulp.src(paths.fontSource)
        .pipe(gulp.dest("./public/fonts"));
});


//this watches all the files in the specified locations, if any files change it will recompile
//This wont watch newly created files while gulp is running, if you make a new file stop gulp with ctrl-c and re-run.
gulp.task('watch', function () {
    gulp.watch(paths.jsSource, ['js']);
    gulp.watch(paths.cssSource, ['build-css']);
    gulp.watch(paths.sassSource, ['sass']);
    gulp.watch(paths.indexSource, ['index']);
    gulp.watch(paths.viewsSource, ['views']);
    gulp.watch(paths.picturesSource, ['pictures']);
    gulp.watch(paths.fontSource, ['copy:fonts']);
});

// gulp.task('watch', function() {
//     return gulp.watch(['./index.html','./partials/*.html', './styles/*.*css', './js/**/*.js'], ['build']);
// });

//when you type gulp and run it in the command like this is the default task that runs.
//this will run all the tasks listed in the array in order. when its done it watches for changes and will recompile if anything changes.
gulp.task('default', ['js', 'sass', 'index', 'views', 'pictures', 'copy:fonts', 'build-css', 'copy:jsPlugin', 'copy:cssPlugin',
    'watch'
]);