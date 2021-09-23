---
sidebar_position: 6
---

# Release process

This document describes Capact release process.

## Prerequisites

- Admin role on the `capact`, `hub-manifests` and `website` repositories.
- Disabled branch protection rules for all repositories. This allows the release jobs to commit directly to `main` and release branches.

    > **NOTE:** Do not forget to re-enable them after creating a release.

- An GitHub Environment named `Release` in [`capactio/capact`](https://github.com/capactio/capact), [`capactio/hub-manifests`](https://github.com/capactio/hub-manifests) and [`capactio/website`](https://github.com/capactio/website) repositories with the following secret set:
    - `GH_PAT` — GitHub personal access token. Make sure that it has selected `repo` and `write:packages` scopes. Must be in format: `"<username>:<PAT>"`
- In GitHub Environment named `Release` in [`capactio/capact`](https://github.com/capactio/capact) repository add the following secret:
    - `GCS_CREDS` — Base64-encoded Google Cloud Platform credentials in JSON format to access Google Cloud Storage for binary and chart releases. Make sure that it has `storage.objects.create` permission.

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

### Release documentation

The release of Capact documentation is automated and done using a GitHub Action workflow.
If you release a new major or minor Capact version, follow these steps:

1. Open the [Make release](https://github.com/capactio/website/actions/workflows/make-release.yaml) workflow.
1. Click `Run workflow` and for the version parameter, provide an already released Capact version.
1. Click `Run workflow` to start the release workflow.

To read more about documentation versioning, see the [Versioning](https://docusaurus.io/docs/versioning) page on the Docusaurus website.
