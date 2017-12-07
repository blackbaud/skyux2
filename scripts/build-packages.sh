# Fail the build if this step fails
set -e

npm run clean:srctemp
node config/utils/stage-ts.js
cd .srctemp
ngc
cd ../
npm run compile:sass
npm run copy:design-tokens
cd config/rollup
rollup -c rollup.config.js
rollup -c rollup.min.config.js
rollup -c rollup.demo.config.js
rollup -c rollup.demo.min.config.js
npm run clean:srctemp
