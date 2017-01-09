# Fail the build if this step fails
set -e

# Necessary to stop pull requests from forks from running outside of Savage
# Publish a tag to NPM & skyux2-releases repo
if [[ "$TRAVIS_SECURE_ENV_VARS" == "true" && -n "$TRAVIS_TAG" ]]; then
  npm run releases
  ./scripts/releases-publish.sh
fi
