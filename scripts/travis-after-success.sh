# Fail the build if this step fails
set -e

# Necessary to stop pull requests from forks from running outside of Savage
# Publish a tag to NPM & skyux2-releases repo
if [ "$IS_FORK_PR" == "false" && -n "$TRAVIS_TAG" ]; then
  npm run releases
  ./npm-publish.sh
  ./releases-publish.sh
fi
