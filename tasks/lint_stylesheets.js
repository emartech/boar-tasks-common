'use strict';

var stylint = require('stylint');
var glob = require('glob');
var fs = require('fs');

module.exports = function(config, cb) {
  return new Promise(function(resolve, reject) {
    var files = glob.sync(config.pattern);

    stylint(files, config.config.rules)
      .methods({
        read: function() {
          this.cache.filesLen = files.length;
          this.cache.files = files;
          this.parse(null, this.cache.files.map(function(file) {
            return fs.readFileSync(file).toString();
          }));

          this.parse(null, files);
        },
        done: function() {
          if (this.cache.warnings.length === 0) {
            if (cb) cb();
            resolve();
          } else {
            console.log(this.cache.msg + '\n');
            console.log(this.cache.warnings.join('\n\n'));

            var err = new Error('Stylint failed');
            if (cb) cb(err);
            reject(err);
          }
        }
      })
      .create();
  });
};
