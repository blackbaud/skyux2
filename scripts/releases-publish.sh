# Read the version from package.json
version=$(node -p -e "require('../package.json').version")
src=../releases/.
destination=releases/skyux2/$version/
checkout=skyux2-releases-repo

# What user will be committing to the sky-docs repo
git config --global user.email "sky-build-user@blackbaud.com"
git config --global user.name "Blackbaud Sky Build User"

# Clones the skyux-releases repo into a "releases/" folder
git clone --quiet https://${GH_TOKEN}@github.com/blackbaud/skyux2-releases.git $checkout > /dev/null

# Make sure sky-pages folder exists
cd $checkout
mkdir -p $destination

# Copy our files from dist-prod into pages-prod
cp -rf $src $destination
git add -f .

if [ -z "$(git status --porcelain)" ]; then
  echo -e "No changes to commit to skyux2-releases."
else
  git commit -m "$version"
  git push -fq origin master > /dev/null
  echo -e "skyux2-releases successfully updated.\n"
fi
