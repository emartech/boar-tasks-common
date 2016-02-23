'use strict';

module.exports = function(pattern, cb) {
  return new Promise(function(resolve, reject) {
    var CLIEngine = require('eslint').CLIEngine;
    var eslint = new CLIEngine();

    var report = eslint.executeOnFiles([pattern]);
    var errors = report.results.filter(function(result) {
      return result.errorCount > 0 || result.warningCount > 0;
    });
    console.log(eslint.getFormatter()(errors));

    if (report.errorCount === 0) {
      if (cb) cb();
      resolve();
    } else {
      var err = new Error('ESLint failed');
      if (cb) cb(err);
      reject(err);
    }
  });
};
