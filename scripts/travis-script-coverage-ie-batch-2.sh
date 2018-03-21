# Fail the build if this step fails
set -e

# Necessary to stop pull requests from forks from running outside of Savage
if [ "$TRAVIS_SECURE_ENV_VARS" == "true" ]; then
  npm run test:unit:ci:ie -- --batchCount 30 --batchStartAtIndex 29
else
  echo -e "Pull requests from forks are run via Savage."
fi
