'use strict';

let glob = require('glob');
var RcLoader = require('rcloader');
var PugLint = require('pug-lint');
var path = require('path');
var _ = require('lodash');

module.exports = function(pattern, cb) {
  return new Promise(function(resolve, reject) {
    var rc = new RcLoader('.pug-lintrc');
    var errors = glob.sync(pattern).reduce(function(err, file) {
      var filePath = path.resolve(file);
      var pugLintConfig = rc.for(filePath);
      if (pugLintConfig.extends) {
        var defaultConfig = require(path.resolve('node_modules/pug-lint-config-' + pugLintConfig.extends));
        pugLintConfig = _.extend({}, defaultConfig, _.omit(pugLintConfig, 'extends'));
      }

      var linter = new PugLint();
      linter.configure(pugLintConfig);
      var errors = linter.checkFile(filePath);

      if (errors.length) {
        err = err.concat(errors.length + ' issues found in ' + filePath);
        errors.forEach(function(error) {
          err = err.concat(error.message);
        });
      }

      return err;
    }, []);

    if (errors.length === 0) {
      if (cb) cb();
      resolve();
    } else {
      errors.forEach(function(error) {
        console.log(error);
      });

      var err = new Error('Pug lint failed');
      if (cb) cb(err);
      reject(err);
    }
  });
};
