# Fail the build if this step fails
set -e

# Update the dist folder of the current branch, as long as it's a push and not a savage- branch.
if [[ "$TRAVIS_PULL_REQUEST" == "false" && ! $TRAVIS_BRANCH =~ $SAVAGE_BRANCH ]]; then
  echo -e "Starting to update skyux.\n"

  git config --global user.email "sky-build-user@blackbaud.com"
  git config --global user.name "Blackbaud Sky Build User"
  git clone --quiet --branch=$TRAVIS_BRANCH https://${GH_TOKEN}@github.com/blackbaud/skyux2.git skyux2 > /dev/null

  cp -rf webdriver-screenshots/ skyux2/
  cd skyux2

  git add webdriver-screenshots/

  if [ -z "$(git status --porcelain)" ]; then
    echo -e "No changes to commit to skyux."
  else
    git commit -m "Travis build $TRAVIS_BUILD_NUMBER pushed to skyux [ci skip]"
    git push -fq origin $TRAVIS_BRANCH > /dev/null
    echo -e "skyux successfully updated.\n"
  fi

fi
