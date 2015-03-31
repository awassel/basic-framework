var syncsrc = [ '**', '!**/sass/**' ];

module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({

    sync: {
      dev: {
        files: [
          { cwd: 'src', src: syncsrc, dest: 'build/dev' }
        ]
      },
      release: {
        files: [
          { cwd: 'src', src: syncsrc, dest: 'build/release' }
        ],
        verbose: true
      }
    },


    compass: {
      options: { sassDir: 'src/sass', require: [ 'breakpoint' ]},
      dev: { options: { cssDir: 'build/dev/stylesheets' } },
      release: { options: { outputStyle: 'compressed', cssDir: 'build/release/stylesheets' } }
    },

    open: { file: { path: 'build/release/bcc-output.txt' } },

    watch: {
      files: { files: 'src/**/*.*', tasks: ['sync:dev'] },
      css: { files: 'src/**/*.scss', tasks: ['compass:dev'] }
    }


  });

  grunt.loadNpmTasks('grunt-sync');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-open');


  // Default task
  grunt.registerTask('default', [
    'sync',
    'compass',
    'watch'
  ]);


  // Target-specific tasks

  // Dev
  grunt.registerTask('dev', [
    'sync:dev',
    'compass:dev'
  ]);

  // Release
  grunt.registerTask('release', [
    'sync:release',
    'compass:release',
    'open'
  ]);

};