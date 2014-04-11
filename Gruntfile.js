/* global module */

module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

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

        yuidoc: {
            doc: {
                name: "<%= pkg.name %>",
                description: "<%= pkg.description %>",
                version: "<%= pkg.version %>",
                options: {
                    paths: 'src/',
                    outdir: "doc/"
                }
            }
        },

        uglify: {
            dist: {
                src: "src/*.js",
                dest: "dist/Base64.min.js"
            },
            options: {
                preserveComments: "some"
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-jasmine");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-yuidoc");

    grunt.registerTask("default", "watch");
    grunt.registerTask("test", "jasmine");
    grunt.registerTask("build", ["test", "yuidoc", "uglify"]);
};
