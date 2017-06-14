# This file only runs if there are results from the visualtests
# It's using the deploy key specified in Travis since Secure Environemnt Variables aren't available to forks.

if [[ "$(ls -A webdriver-screenshots-diffs)" ]]; then

    echo -e "Starting to update webdriver test results.\n"

    git config --global user.email "sky-build-user@blackbaud.com"
    git config --global user.name "Blackbaud Sky Build User"
    git clone --quiet https://${GH_TOKEN}@github.com/blackbaud/skyux-visualtest-results.git skyux-visualtest-results-webdriver > /dev/null

    cd skyux-visualtest-results-webdriver

    branch="skyux2-$TRAVIS_BUILD_NUMBER-webdriver"
    if [[ $TRAVIS_BRANCH =~ $SAVAGE_BRANCH ]]; then
      branch="$branch-savage"
    fi
    git checkout -b $branch

    cp -rf ../skyux-spa-visual-tests/screenshots-created/ created-screenshots/

    mkdir -p failures

    cp -rf ../skyux-spa-visual-tests/screenshots-diff/ failures/

    mkdir -p all

    cp -rf ../skyux-spa-visual-tests/screenshots-baseline/ all/

    git add -A
    if [ -z "$(git status --porcelain)" ]; then
        echo -e "No changes to commit to skyux visual test webdriver results."
    else
        git commit -m "Travis build $TRAVIS_BUILD_NUMBER webdriver screenshot results pushed to skyux-visualtest-results"
        git push -fq origin $branch > /dev/null
        echo -e "skyux-visualtest-results webdriver successfully updated.\nTest results may be viewed at https://github.com/blackbaud/skyux-visualtest-results/tree/$branch"
    fi
fi
