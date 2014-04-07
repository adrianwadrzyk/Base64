/* global module */

module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        jshint: {
            src: ["src/*.js", "test/spec/*.js"]
        },

        jasmine: {
            src: "src/*.js",
            options: {
                specs: "test/spec/**/*.js",
                keepRunner: true,
                outfile: "test/index.html"
            }
        },

        watch: {
            files: "<%= jshint.src %>",
            tasks: ["jshint", "jasmine"]
        },

        uglify: {
            dist: {
                src: "src/*.js",
                dest: "dist/Base64.min.js"
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-jasmine");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-uglify");

    grunt.registerTask("default", "watch");
    grunt.registerTask("test", "jasmine");
};
