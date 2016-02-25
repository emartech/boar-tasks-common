'use strict';

module.exports = function(config) {

  return {
    clean: function() {
      return new Promise(function(resolve, reject) {
        require('del')([config.build.distPath + '**/*'], function(err) {
          if (err) return reject(err);
          resolve();
        });
      });
    },

    deploy: function() {
      var gulp = require('gulp');
      var exec = require('gulp-exec');
      var confirm = require('inquirer-confirm');

      return confirm('Do you really want to deploy to production?')
        .then(function confirmed() {
          return new Promise(function(resolve, reject) {
            var stream = gulp.src('gulpfile.js')
              .pipe(exec('git pull origin master; git push origin master;git push origin master:production'))
              .pipe(exec.reporter({ err: true, stderr: true, stdout: true }));
            stream.on('end', function() {
              resolve();
            });
            stream.on('error', function(err) {
              reject(err);
            });
          });
        });
    }
  };

};
