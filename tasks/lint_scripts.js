'use strict';

module.exports = function(pattern) {
  return new Promise(function(resolve, reject) {
    var CLIEngine = require('eslint').CLIEngine;
    var eslint = new CLIEngine();

    var report = eslint.executeOnFiles([pattern]);
    var errors = report.results.filter(function(result) {
      return result.errorCount > 0 || result.warningCount > 0;
    });
    console.log(eslint.getFormatter()(errors));

    if (report.errorCount === 0) {
      resolve();
    } else {
      reject(new Error('ESLint failed'));
    }
  });
};
