const fs = require('fs-extra');
const glob = require('glob');
const logger = require('@blackbaud/skyux-logger');

/**
 * Some of our SKY UX libraries were transpiled using TypeScript 3
 * which updates the metadata version number in the bundle.
 * Angular's AoT compiler fails if these numbers are mismatched
 * between libraries, so we must hijack the process to make sure
 * the version numbers are all consistent.
 */
function applyMetadataBackwardsCompatability() {

  const files = glob.sync(
    'node_modules/@skyux/**/*.metadata.json'
  );

  files.forEach((file) => {
    const contents = fs.readFileSync(file, 'utf8').toString();
    const regExp = /"version":4/g;

    if (!regExp.test(contents)) {
      return;
    }

    logger.info(`Fixing metadata version for backwards compatibility: ${file}`);

    const updatedContents = contents.replace(regExp, '"version":3');

    fs.writeFileSync(file, updatedContents, {
      encoding: 'utf8'
    });
  });
}

applyMetadataBackwardsCompatability();
