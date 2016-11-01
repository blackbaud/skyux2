# Fail the build if this step fails
set -e

# Necessary to stop pull requests from forks from running outside of Savage
# Upload coverage to https://codecov.io/gh/blackbaud/skyux2
if [ -n "$IS_FORK_PR" ]; then
  bash <(curl -s https://codecov.io/bash)
  ./browserstack-cleanup.sh
fi
