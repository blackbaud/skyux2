/*jslint node: true */
'use strict';

/* Taken from browserstack selenium test tips at https://www.browserstack.com/automate/node */
const http = require('http');
const https = require('https');

const keepAliveTimeout = 30 * 1000;

if (http.globalAgent && http.globalAgent.hasOwnProperty('keepAlive')) {
  http.globalAgent.keepAlive = true;
  https.globalAgent.keepAlive = true;
  http.globalAgent.keepAliveMsecs = keepAliveTimeout;
  https.globalAgent.keepAliveMsecs = keepAliveTimeout;
} else {
  const agent = new http.Agent({
    keepAlive: true,
    keepAliveMsecs: keepAliveTimeout
  });

  const secureAgent = new https.Agent({
    keepAlive: true,
    keepAliveMsecs: keepAliveTimeout
  });

  const httpRequest = http.request;
  const httpsRequest = https.request;

  http.request = (options, callback) => {
    if (options.protocol === 'https:') {
      options.agent = secureAgent;
    } else {
      options.agent = agent;
    }

    return httpRequest(options, callback);
  };
}
