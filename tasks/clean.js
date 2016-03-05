'use strict';

module.exports = function(config) {
  return new Promise(function(resolve, reject) {
    require('del')([config.build.distPath + '**/*'], function(err) {
      if (err) return reject(err);
      resolve();
    });
  });
};
