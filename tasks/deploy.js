'use strict';

module.exports = function() {
  var CONFIRM_MESSAGE = 'Do you really want to deploy to production?';
  var ABORTED_MESSAGE = 'Deploy aborted!';
  var confirm = require('inquirer-confirm');
  var exec = require('process-promises').exec;

  return confirm(CONFIRM_MESSAGE)
    .then(function() {
      return exec('git pull origin master; git push origin master;git push origin master:production;')
    })
    .then(function() {
      console.log('Deployed!');
    })
    .catch(function(err) {
      if (!err) return console.log(ABORTED_MESSAGE);
      console.log(ABORTED_MESSAGE, err.message);
    });
}