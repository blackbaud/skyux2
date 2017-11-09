# Fail the build if this step fails
set -e

# Necessary to stop pull requests from forks from running outside of Savage
if [ "$TRAVIS_SECURE_ENV_VARS" == "true" ]; then
  npm run test:unit:ci
  bash <(curl -s https://codecov.io/bash)
else
  echo -e "Pull requests from forks are run via Savage."
fi
