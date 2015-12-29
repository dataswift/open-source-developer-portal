module.exports = function(config) {
    config.set({
        frameworks: [
            'mocha',
            'chai',
            'referee'
        ],

        files: [
            'app/_bower_components/jquery/dist/jquery.js',
            'app/_bower_components/dwolla-core-js/js/dwolla.js',

            'app/js/dwolla/**/*.js',

            'app/js/test/**/*.spec.js'
        ],

        browsers: ['PhantomJS'],

        client: {
            captureConsole: true
        }
    });
};