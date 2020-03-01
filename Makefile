# Makefile

install:
		npm install --save-dev @babel/core @babel/cli @babel/node @babel/preset-env @babel/register eslint eslint-config-airbnb-base eslint-plugin-babel babel-eslint eslint-plugin-import

publish:
		npm publish --dry-run

build:
		rm -rf
		npm build

lint:
		npx eslint src/.

gendiff:
		npx babel-node src/bin/gendiff.js

test-coverage:
		npx jest --collect-coverage
