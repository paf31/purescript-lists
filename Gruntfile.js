module.exports = function(grunt) {

  "use strict";

  grunt.initConfig({

    libFiles: [
      "src/**/*.purs",
      "bower_components/purescript-*/src/**/*.purs"
    ],

    clean: ["tmp", "output"],

    pscMake: {
      lib: {
        src: ["<%=libFiles%>"]
      },
      tests: {
        src: ["tests/**/*.purs", "test/**/*.purs", "<%=libFiles%>"]
      }
    },

    dotPsci: ["<%=libFiles%>"],

    pscDocs: {
      readme: {
        src: ["src/**/*.purs", "test/**/*.purs"],
        dest: "MODULE.md"
      }
    },
    copy: [
      {
        expand: true,
        cwd: "output",
        src: ["**"],
        dest: "tmp/node_modules/"
      }, {
        src: ["js/index.js"],
        dest: "tmp/index.js"
      }
    ],

    execute: {
      tests: {
        src: "tmp/index.js"
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-execute")
  grunt.loadNpmTasks("grunt-purescript");

  grunt.registerTask("test", ["pscMake:tests", "copy", "execute:tests"]);
  grunt.registerTask("make", ["pscMake:lib", "dotPsci", "pscDocs:readme"]);
  grunt.registerTask("default", ["clean", "make"]);//, "test"]);
};
