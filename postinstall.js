const fs = require('fs-extra');
const glob = require('glob');
const logger = require('@blackbaud/skyux-logger');

function metadataCompat() {

  const files = glob.sync(
    'node_modules/@skyux/**/*.metadata.json'
  );

  files.forEach((file) => {
    const contents = fs.readFileSync(file, 'utf8').toString();
    const regExp = /"version":4/g;

    if (!regExp.test(contents)) {
      return;
    }

    logger.log(`Fixing metadata version for backwards compatibility: ${file}`);

    const updatedContents = contents.replace(regExp, '"version":3');

    fs.writeFileSync(file, updatedContents, {
      encoding: 'utf8'
    });
  });
}

metadataCompat();
