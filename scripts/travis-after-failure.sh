# Fail the build if this step fails
set -e

# Display any npm errors
if [ -e ./npm-debug.log ]; then
  cat ./npm-debug.log
fi

# Display any browserstack errors
if [ -e ./browserstack.err ]; then
  cat ./browserstack.err
fi
