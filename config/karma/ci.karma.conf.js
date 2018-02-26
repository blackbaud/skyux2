module.exports = function (config) {
  'use strict';

  require('./shared.karma.conf')(config);

  config.set({
    browserStack: {
      port: 9876,
      pollingTimeout: 10000
    }
  });
};
