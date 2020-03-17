This is a package, which allows to compare two configuration files and prints the difference between them.

[![CI](https://github.com/ivankl/backend-project-lvl2/workflows/CI/badge.svg?branch=master)](https://github.com/ivankl/backend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/cb6f35a9023d0307cc51/maintainability)](https://codeclimate.com/github/ivankl/backend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/cb6f35a9023d0307cc51/test_coverage)](https://codeclimate.com/github/ivankl/backend-project-lvl2/test_coverage)

Installation:
```
npm install gendiff-backend-project-lvl2

```

Usage:

```
Usage: gendiff [options] <firstConfig> <secondConfig>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format [type]  output format (default: "nested")
  -h, --help           output usage information
```


Plain json file diff example: [asciinema](https://asciinema.org/a/E52PshDfwps641C0Aww5vcH5J)

Plain yml file diff example: [asciinema](https://asciinema.org/a/60THuVdLvUHgtzid4nHPGtdpU)

Plain ini file diff example: [asciinema](https://asciinema.org/a/wDLFCaavEUKgE3RdY6BNgFNxh)

Example of to choose nested output format: [asciinema](https://asciinema.org/a/0nkZLn9LUHcNitDVYLjTRbtrS)

Example of to choose plain output format: [asciinema](https://asciinema.org/a/7YNFb7mz0P0DLsFtGv5hXh1ea)

Example of to choose JSON output format: [asciinema](https://asciinema.org/a/JHUXXRLqRZnKtKibSHQUcofCB)
