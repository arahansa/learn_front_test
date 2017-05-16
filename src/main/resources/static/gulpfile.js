/**
 * Created by jarvis on 2016. 12. 29..
 */
var gulp = require('gulp');

var jasmine = require('gulp-jasmine');
var reporters = require('jasmine-reporters');
var jasmineBrowser = require('gulp-jasmine-browser');
var mocha = require('gulp-mocha');




var Server = require('karma').Server;

gulp.task('jasmine', function () {
    return gulp.src([
            'js/codecoast/codecoast.js',
            '../test/spec/test_spec.js'
        ])
        .pipe(jasmineBrowser.specRunner()) 
        .pipe(jasmineBrowser.server({port:9000, reporter:[ 
            new reporters.TerminalReporter()
        ]}));
});


gulp.task('mochatest', function () {
    return gulp.src([
        "./js/lib/*.js",
        "./js/*.js"/*,
        "./js/fibonacci.js",
        "../test/fibonacci.js"*/], {read:false})
        .pipe(mocha({
            reporter:'spec',
            require :'jsdom-global/register'
        }));
});


gulp.task('karma', function(done){
    return new Server({
        configFile : require('path').resolve('karma.conf.js')
    }, done).start();
});



gulp.task('default', ['jasmine']);

gulp.task('tt', function(){
    console.log("하이하이");
});

var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');

gulp.task('babel', function() {
    return gulp.src('js/es2015/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('./', {sourceRoot: '../js/es2015'}))
        .pipe(gulp.dest('out'));;
});
