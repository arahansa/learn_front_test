
'use strict';

module.exports = function (config) {
    config.set({
        browsers: ['Chrome'],
        reporters: ['mocha'],
        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [
                    {
                        test: /(\.js)$/,
                        exclude: /(node_modules)/,
                        loader: ['babel-loader'],
                        query: {
                            presets: ['es2015']
                        }
                    }
                ]
            }
        },
        frameworks: ['mocha'],
        files: [
            './src/**/__tests__/*-test.js'
        ],
        plugins: [
            'karma-chrome-launcher',
            'karma-chai',
            'karma-mocha',
            'karma-sourcemap-loader',
            'karma-webpack',
            'karma-mocha-reporter'
        ],
        preprocessors: {
            './src/**/__tests__/*-test.js': ['webpack']
        },
        coverageReporter: {
            type: 'html',
            dir: 'coverage'
        },
        webpackMiddleware: {
            noInfo: true //please don't spam the console when running in karma!
        },
        singleRun: false
    });
};