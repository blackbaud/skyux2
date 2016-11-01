# Fail the build if this step fails
set -e

# Necessary to stop pull requests from forks from running outside of Savage
# Override default of `npm test`
if [ -n "$IS_FORK_PR" ]; then
  npm run ci && ./scripts/visual-baseline.sh
else
  echo -e "Pull requests from forks are run via Savage."
fi
