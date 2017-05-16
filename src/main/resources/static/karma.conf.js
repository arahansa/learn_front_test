
'use strict';

module.exports = function (config) {
    config.set({
        frameworks: ['mocha'],
        browsers: ['Chrome'],
        files: [
            {pattern:'test/karma.debug.js'},
            {pattern:'js/codecoast/**.js'},
            {pattern:'test/*_test.js'},
        ],
        preprocessors: {
            'js/**/*.js': ['coverage'],
            'js/codecoast/*.js': ['coverage'],
            'test/*_test.js': ['webpack'],
            'test/**/*_test.js': ['webpack']
        },
        webpack: {
            // you don't need to specify the entry option because
            // karma watches the test entry points
            // webpack watches dependencies
            // ... remainder of webpack configuration (or import)
        },
        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i.e.
            noInfo: true,
            // and use stats to turn off verbose output
            stats: {
                // options i.e.
                chunks: false
            }
        },

        plugins: [
            'karma-chrome-launcher',
            'karma-chai',
            'karma-coverage',
            'karma-mocha',
            'karma-sourcemap-loader',
            'karma-mocha-reporter',
            'karma-phantomjs-launcher',
            'karma-webpack',
            'karma-jsdom-launcher'
        ],
        singleRun: false,
        port: 9876,

        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        concurrency: Infinity,

        /**          * coverage options          */
        reporters: ['progress', 'coverage'],
        htmlReporter: {
            outputFile: 'tests/units.html',

            // Optional
            pageTitle: 'Unit Tests',
            subPageTitle: 'A sample project description',
            groupSuites: true,
            useCompactStyle: true,
            useLegacyStyle: true
        },
        coverageReporter: {type: 'html', dir: '../test/coverage/'},
        phantomjsLauncher: {
            // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
            exitOnResourceError: true
        }
    });
};