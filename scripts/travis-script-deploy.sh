# Fail the build if this step fails
set -e

# Necessary to stop pull requests from forks from running outside of Savage
if [[ "$TRAVIS_SECURE_ENV_VARS" == "true" ]]; then
  if [[ -n "$TRAVIS_TAG" ]]; then
    npm run build
    bash <(curl -s https://blackbaud.github.io/skyux-travis/after-success.sh)
  else
    echo -e "Git tag not found. Ignoring deployment."
  fi
else
  echo -e "Pull requests from forks are run via Savage."
fi
