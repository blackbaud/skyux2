'use strict';

var glob = require('glob'),
  remap = require('remap-istanbul');

function remapSourceMap() {
  var files = glob.sync('coverage/**/coverage-final.json');
  var promises = [];

  console.log('Remapping ' + files.length + ' coverage JSON files.');
  files.forEach(function (file) {
    promises.push(remap(file, {
      json: file
    }));
  });

  Promise.all(promises).then(function (a) {
    console.log('Remapping coverage complete.');
  });
}

remapSourceMap();
