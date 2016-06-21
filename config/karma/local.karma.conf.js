/**
 * @author: @AngularClass
 */

module.exports = function (config) {
  'use strict';

  require('./shared.karma.conf')(config);

  config.set({
    coverageReporter: {
      reporters: [{
        type: 'html'
      }]
    },
    browsers: [
      'Chrome'
    ]
  });

};
