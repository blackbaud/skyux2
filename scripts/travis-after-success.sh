# Fail the build if this step fails
set -e

# Necessary to stop pull requests from forks from running outside of Savage
# Publish a tag to NPM & skyux2-releases repo
if [ "$IS_FORK_PR" == "false" && -n "$TRAVIS_TAG" ]; then
  npm run releases
  ./scripts/npm-publish.sh
  ./scripts/releases-publish.sh
fi
