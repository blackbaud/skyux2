# Fail the build if this step fails
set -e

# Login to NPM, publish, and display message
echo -e "blackbaud-skyux\n$NPM_PASSWORD\nsky-build-user@blackbaud.com" | npm login
npm publish
npm logout
echo -e "blackbaud-skyux2 successfully deployed to NPM.\n"
