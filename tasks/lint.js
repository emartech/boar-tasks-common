'use strict';

module.exports = function(gulp) {

  return {
    scripts: function(pattern) {
      var eslint = require('gulp-eslint');

      return gulp.src(pattern)
        .pipe(eslint({
          useEslintrc: true
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
    },

    stylesheets: function(pattern, config) {
      var stylint = require('gulp-stylint');

      return gulp.src(pattern)
        .pipe(stylint(config))
        .pipe(stylint.reporter())
        .pipe(stylint.reporter('fail', {
          failOnWarning: true
        }));
    },

    templates: function(pattern) {
      var pugLint = require('gulp-pug-lint');

      return gulp.src(pattern)
        .pipe(pugLint());
    },

    nsp: function(packageJsonPath, cb) {
      var gulpNsp = require('gulp-nsp');
      gulpNsp({
        package: packageJsonPath,
        stopOnError: false,
        output: 'summary'
      }, cb);
    }
  };

};
