# Makefile

install:
	npm install --save-dev @babel/core @babel/cli @babel/node @babel/preset-env @babel/register

install_eslint:
	npm install --save-dev eslint eslint-config-airbnb-base eslint-plugin-babel babel-eslint eslint-plugin-import

publish:
	npm publish --dry-run

lint:
	npx eslint src/.

gendiff:
	npx babel-node src/bin/gendiff.js

test-coverage:
	npx jest --collect-coverage

test:
	npx jest --watch
