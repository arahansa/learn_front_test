/**
 * Created by jarvis on 2016. 12. 29..
 */
module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],
        reporters: ['kjhtml', 'progress', 'coverage'], //kjhtml
        browsers: ['Chrome'], // PhantomJS, Chrome 
        files: [
            {pattern:'node_modules/jquery/dist/jquery.min.js'},
            {pattern:'../test/karma.debug.js'},
            {pattern:'js/codecoast/**.js'},
            {pattern:'../test/spec/*_spec.js'}
        ],
        singleRun: false,
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        concurrency: Infinity,

        /**          * coverage options          */ 
        // reporters: ['progress', 'coverage'],
        preprocessors: {'js/**/*.js': ['coverage'], 'js/codecoast/*.js': ['coverage']},  
        // optionally, configure the reporter 
        coverageReporter: {type: 'html', dir: '../test/coverage/'}
    });
};


