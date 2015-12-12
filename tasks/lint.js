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

    styl: function(pattern, config) {
      var stylint = require('gulp-stylint');

      return gulp.src(pattern)
        .pipe(stylint(config))
        .pipe(stylint.reporter())
        .pipe(stylint.reporter('fail', {
          failOnWarning: true
        }));
    },

    jade: function(pattern) {
      var jadeLint = require('gulp-jade-lint');

      return gulp.src(pattern)
        .pipe(jadeLint());
    }
  };

};
