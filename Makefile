# Makefile

install:
		install-deps

publish:
		npm publish --dry-run

install-deps:
			npm ci

build:
		rm -rf
		npm run build

lint:
		npx eslint src/.

gendiff:
		npx babel-node src/bin/gendiff.js

test-coverage:
		npx jest --collect-coverage
