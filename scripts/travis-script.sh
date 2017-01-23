# Fail the build if this step fails
set -e

# Necessary to stop pull requests from forks from running outside of Savage
# Override default of `npm test`
if [ "$TRAVIS_SECURE_ENV_VARS" == "true" ]; then
  npm run ci && skyux build && ./scripts/visual-baseline.sh
else
  echo -e "Pull requests from forks are run via Savage."
fi
