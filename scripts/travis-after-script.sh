# Fail the build if this step fails
set -e

# Necessary to stop pull requests from forks from running outside of Savage
# Upload coverage to https://codecov.io/gh/blackbaud/skyux2
if [ "$TRAVIS_SECURE_ENV_VARS" == "true" ]; then
  bash <(curl -s https://codecov.io/bash)
  ./scripts/browserstack-cleanup.sh
fi
