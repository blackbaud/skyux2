# Fail the build if this step fails
set -e

# Necessary to stop pull requests from forks from running outside of Savage
# Display any NPM / BrowserStack errorsc
if [ -n "$IS_FORK_PR" ]; then
  ./visual-failures.sh

  if [ -e ../npm-debug.log ]; then
    cat ../npm-debug.log
  fi

  if [ -e ../browserstack.err ]; then
    cat ../browserstack.err
  fi
fi
