# Capact release process

This document describes Capact release process.

---
**NOTE**

Releasing new Capact version requires admin privileges in the `capact`, `hub-manifests` and `website` repositories.

---

## Prerequisites

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- An GitHub Environment named `Release` on [`capactio/capact`](https://github.com/capactio/capact) repository with the following secrets set:
  - `GCS_CREDS` — Base64 encoded Google Cloud Platform credentials in JSON format to access Google Cloud Storage for binary and chart releases. Make sure that it has `storage.objects.create` permission,
  - `GH_PAT` — GitHub personal access token. Make sure that it has selected `repo` and `write:packages` scopes.

All our repositories have enabled branch protection rules which disallow directly committing to the repository. Make sure to disable them before proceeding and re-enable them after making a release.

## Steps

Use [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html) to specify the next Capact release.

### Release Capact container images and binaries

The release of Capact container images and binaries is automated and done using a GitHub Action workflow.

1. Open the [Make release](https://github.com/capactio/capact/actions/workflows/make-release.yaml) workflow.
1. Click `Run workflow` and depending on your scenario:
   - if making a major/minor release from `main`, select the `main` branch and put the version in SemVer, e.g. `0.5.0`,
   - if making a patch release from a release branch, select the given release branch and put the version in SemVer, e.g. `0.5.1`.
1. Click `Run workflow` to start the release workflow.

The workflow will prepare the release branch, tag the appropriate commit and create a GitHub Release. [`gren`](https://github.com/github-tools/github-release-notes) is used to create the release notes from merged pull requests.

> *NOTE:* After the release is complete consider removing the `GH_PAT` from the Release environment.

### Prepare Hub for release 

The release of Hub Manifests is automated and done using a GitHub Action workflow.

1. Open the [Make release](https://github.com/capactio/hub-manifests/actions/workflows/make-release.yaml) workflow.
1. Click `Run workflow` and put the version parameter and the runner image tag from a [`capactio/capact`](https://github.com/capactio/capact) build.
1. Click `Run workflow` to start the release workflow.

## Release documentation

The release of Capact documentation is automated and done using a GitHub Action workflow.
If you release a new major or minor Capact version, follow these steps:

1. Open the [Make release](https://github.com/capactio/website/actions/workflows/make-release.yaml) workflow.
1. Click `Run workflow` and for the version parameter, provide an already released Capact version.
1. Click `Run workflow` to start the release workflow.

To read more about documentation versioning, see the [Versioning](https://docusaurus.io/docs/versioning) page on the Docusaurus website.
