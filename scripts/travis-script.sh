# Fail the build if this step fails
set -e

# Necessary to stop pull requests from forks from running outside of Savage
# Override default of `npm test`
if [ "$TRAVIS_SECURE_ENV_VARS" == "true" ]; then
  ./scripts/browserstack-cleanup.sh && npm run ci

  # Remove this line after stache and builder update to ng4:
  rimraf ./node_modules/@blackbaud/skyux/node_modules

  skyux build && ./scripts/visual-baseline.sh
else
  echo -e "Pull requests from forks are run via Savage."
fi
