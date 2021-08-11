#!usr/bin/env sh

set -e

npm run build

cd dist/spa

git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:DaniyelMe/pokedex.git master:gh-pages

cd -