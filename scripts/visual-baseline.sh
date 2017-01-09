# Fail the build if this step fails
set -e

# Update the webdriver-screenshots folder of the current branch, as long as it's a push and not a savage- branch.
if [[ "$TRAVIS_PULL_REQUEST" == "false" && ! $TRAVIS_BRANCH =~ $SAVAGE_BRANCH ]]; then
  echo -e "Starting to update skyux2.\n"

  git config --global user.email "sky-build-user@blackbaud.com"
  git config --global user.name "Blackbaud Sky Build User"
  git clone --quiet --branch=$TRAVIS_BRANCH https://${GH_TOKEN}@github.com/blackbaud/skyux2.git skyux2 > /dev/null

  cp -rf webdriver-screenshots/ skyux2/
  cd skyux2

  if [ -z "$(git ls-files --others --exclude-standard)" ]; then
    echo -e "No changes to commit to skyux2."
  else
    git add webdriver-screenshots/
    git commit -m "Travis build $TRAVIS_BUILD_NUMBER pushed to skyux2 [ci skip]"
    git push -fq origin $TRAVIS_BRANCH > /dev/null
    echo -e "skyux2 successfully updated.\n"
  fi

fi
