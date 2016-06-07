'use strict';

let glob = require('glob');
let remap = require('remap-istanbul');

function remapSourceMap(type) {
  let files = glob.sync('coverage/**/coverage-final.json');
  let promises = [];

  console.log('Remapping ' + files.length + ' coverage JSON files into ' + type);

  files.forEach(function (file) {
    let destination = file;
    let output = {};

    if (type === 'html') {
      let folders = file.split('/');
      let browser = folders.length > 2 ? folders[folders.length - 2] : '';
      destination = 'coverage-remapped/' + browser + '/';
    }

    output[type] = destination;
    promises.push(remap(file, output));
  });

  Promise.all(promises).then(function (a) {
    console.log('Remapping coverage complete.');
  });
}

// Read remap type
if (process.argv.length > 2) {
  remapSourceMap(process.argv[2]);
} else {
  console.log('Remapping type required.');
}
