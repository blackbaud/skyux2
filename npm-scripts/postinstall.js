const logger = require('@blackbaud/skyux-logger');

const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');

/**
 * Some of our SKY UX libraries were transpiled using TypeScript 3
 * which updates the metadata version number in the bundle.
 * Angular's AoT compiler fails if these numbers are mismatched
 * between libraries, so we must hijack the process to make sure
 * the version numbers are all consistent.
 */
function applyMetadataBackwardsCompatability() {

  const logPrefix = '[@blackbaud/skyux]';

  logger.info(`${logPrefix} Checking metadata files for backwards compatibility...`);

  const metadataPattern = '@skyux/**/*.metadata.json';

  // The value of `process.cwd()` is different if you're running install
  // during local development or as a consumer of `@blackbaud/skyux`.
  const metadataPatternLocal = path.resolve(process.cwd(), 'node_modules', metadataPattern);
  const metadataPatternConsumer = path.resolve(process.cwd(), '../../', metadataPattern);

  const files = glob.sync(
    metadataPatternLocal
  ).concat(glob.sync(
    metadataPatternConsumer
  ));

  const numTotalFiles = files.length;
  let numModifiedFiles = 0;

  files.forEach((file) => {
    const contents = fs.readFileSync(file, 'utf8').toString();
    const regExp = /"version":4/g;

    if (!regExp.test(contents)) {
      return;
    }

    const updatedContents = contents.replace(regExp, '"version":3');

    fs.writeFileSync(file, updatedContents, {
      encoding: 'utf8'
    });

    logger.info(`${logPrefix} Modified metadata version for: ${file}`);

    numModifiedFiles++;
  });

  if (numModifiedFiles > 0) {
    logger.info(`\n${logPrefix} Successfully modified ${numModifiedFiles} of ${numTotalFiles} metadata files for backwards compatibility.\n`);
  } else {
    logger.info(`${logPrefix} No incompatible metadata files found (out of ${numTotalFiles}).\n`);
  }
}

applyMetadataBackwardsCompatability();
