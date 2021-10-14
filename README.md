# Capact.io Website

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![GitHub Actions main branch CI](https://github.com/capactio/website/actions/workflows/branch-build.yaml/badge.svg?branch=main)](https://github.com/capactio/website/actions/workflows/branch-build.yaml?query=branch%3Amain)

This repository contains source code of the [**capact.io**](https://capact.io) website.

## Development

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Prerequisites

To get started with the development, install the following dependencies:

- [Node 16 and NPM 7](https://nodejs.org)

### Installation

To install all dependencies, run:

```bash
npm install
```

### Local Development

To start a local development server and open up a browser window, run:

```bash
npm start
```

Most changes are reflected live without having to restart the server.

### Build

To generate static content into the `build` directory, run:

```
npm run build
```

It can be served using any static contents hosting service. You can use `npm run serve` command to set up a development static server.

### Synchronize CLI documentation

The documents that describe Capact CLI commands reside in the `capact` repository. To synchronize them, run:

```bash
npm run sync-cli-docs
```

> **NOTE:** The script assumes that the `capact` repository is located under the `../capact` path relative to the root of the directory.