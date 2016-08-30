# What user will be committing to the sky-docs repo
git config --global user.email "sky-build-user@blackbaud.com"
git config --global user.name "Blackbaud Sky Build User"

# Clones the skyux-releases repo into a "releases/" folder
git clone --quiet https://${GH_TOKEN}@github.com/blackbaud/skyux-releases.git skyux-releases-repo > /dev/null

# Make sure sky-pages folder exists
cd skyux-releases-repo
mkdir -p releases/skyux/pages-prod/

# Copy our files from dist-prod into pages-prod
cp -rf ../dist-prod/. releases/skyux/pages-prod/
git add -f .

if [ -z "$(git status --porcelain)" ]; then
  echo -e "No changes to commit to skyux-releases."
else
  git commit -m "Travis build $TRAVIS_BUILD_NUMBER pushed pages-prod to skyux-releases"
  git push -fq origin master > /dev/null
  echo -e "skyux-releases pages-prod folder successfully updated.\n"
fi
