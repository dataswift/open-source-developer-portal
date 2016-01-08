module.exports = function(grunt) {
    'use strict';

    return {
        options: {
            jshintrc: '.jshintrc',
            reporter: require('jshint-stylish')
        },
        all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/js/**/*.js',
                'test/spec/**/*.js',
                '!<%= yeoman.app %>/js/dwolla/**/*.js',
                '!<%= yeoman.app %>/js/test/**/*.js',
                '!<%= yeoman.app %>/js/developer.js'
            ]
        }
};