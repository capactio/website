# Capact.io Website

This repository contains source code of the [**capact.io**](https://capact.io) website.

## Development

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Prerequisites

To get started with the development, install the following dependencies:

- [Node 15 and NPM 7](https://nodejs.org)

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

### Synchronize documentation

Files in the `docs` directory are synchronized from `capact` repository. To synchronize them, run:

```bash
npm run sync-docs
```

> **NOTE:** The script assumes that the `capact` repository is located on the `../capact` path relative to the root of the directory.