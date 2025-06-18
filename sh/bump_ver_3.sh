#!/bin/bash

CURVER=$(sh/package_ver.sh)
COMMAND=$1

# inject .env vars
ENV="${NODE_ENV:-development}"
source "$PWD/.env" 2> /dev/null
source "$PWD/.env.$ENV" 2> /dev/null

if [[ ! $COMMAND =~ "pre" ]]; then
  echo npm version $COMMAND --no-git-tag-version
  npm version $COMMAND --no-git-tag-version
else
  if [[ $CURVER =~ "-" ]]; then
    echo npm version prelease --no-git-tag-version
    npm version prerelease --no-git-tag-version
  else
    echo npm version $COMMAND --no-git-tag-version
    npm version $COMMAND --no-git-tag-version
  fi
fi

NEWVER=$(sh/package_ver.sh)
#sed -i "s/Version:.*/Version: $NEWVER/" dist@/pkg/deb/idp_engine_frontend@_deb_x64/DEBIAN/control

# push to git
git commit --all -m "$NEWVER"
git tag -a v$NEWVER -m "$NEWVER"
git push origin --all --follow-tags

# esbuild
npm run esbuild

# publish to npm
export NPM_TOKEN
npm publish
#git push origin --tags