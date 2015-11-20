'use strict';

module.exports = function(gulp) {

  return {
    scripts: function(pattern) {
      var eslint = require('gulp-eslint');

      return gulp.src(pattern)
        .pipe(eslint({
          useEslintrc: true
        }))
        .pipe(eslint.format());
    },

    styl: function(pattern, config) {
      var stylint = require('gulp-stylint');

      return gulp.src(pattern)
        .pipe(stylint(config));
    },

    jade: function(pattern) {
      var jadeLint = require('gulp-jade-lint');

      return gulp.src(pattern)
        .pipe(jadeLint());
    }
  };

};
