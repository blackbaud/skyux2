# Fail the build if this step fails
set -e

# Necessary to stop pull requests from forks from running outside of Savage
if [ "$TRAVIS_SECURE_ENV_VARS" == "true" ]; then
  # Building SKY UX requires a lot of memory:
  # https://github.com/npm/npm/issues/12238#issuecomment-301645764
  skyux build --output-keep-alive
else
  echo -e "Pull requests from forks are run via Savage."
fi
