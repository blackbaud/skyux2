# Fail the build if this step fails
set -e

# Login to NPM, publish, and display message
echo -e "blackbaud\n$NPM_PASSWORD\nsky-savage@blackbaud.com" | npm login
npm publish --access public
npm logout
echo -e "@blackbaud/skyux successfully deployed to NPM.\n"
