# Makefile

install:
	npm ci

publish:
	npm publish --dry-run

build:
	rm -rf
	npm run build

lint:
	npx eslint .

gendiff:
	npx babel-node src/bin/gendiff.js

test-coverage:
	npx jest --collect-coverage
