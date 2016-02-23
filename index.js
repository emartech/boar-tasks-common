'use strict';

module.exports = {
  config: require('./tasks/config'),
  build: require('./tasks/build'),
  lint: {
    scripts: require('./tasks/lint_scripts'),
    stylesheets: require('./tasks/lint_stylesheets'),
    templates: require('./tasks/lint_templates')
  }
};
