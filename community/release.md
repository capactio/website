---
sidebar_position: 6
---

# Release process

This document describes Capact release process.

## Prerequisites

1. For **all** of the following repositories:

    - [`capactio/capact`](https://github.com/capactio/capact)
    - [`capactio/hub-manifests`](https://github.com/capactio/hub-manifests)
    - [`capactio/dashboard`](https://github.com/capactio/dashboard)
    - [`capactio/website`](https://github.com/capactio/website)

    make sure all of the following prerequisites are met:

    - Admin role for a given repository.
    - Disabled branch protection rules. This allows the release jobs to commit directly to `main` and release branches.
    - An GitHub Environment named `Release` in a given repository with the following secret set:
        - `GH_PAT` — GitHub personal access token. Make sure that it has `repo` and `write:packages` scopes. Must be in format: `<username>:<PAT>`

1. Moreover, there are additional prerequisites for the [`capactio/capact`](https://github.com/capactio/capact) repository:

    - In GitHub Environment named `Release`, add the following secret:
        - `GCS_CREDS` — Google Cloud Platform credentials in JSON format to access Google Cloud Storage for binary and chart releases. Make sure that it has `storage.objects.create` permission.

## Steps

Use [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html) to specify the next Capact release.

### Release Dashboard

The release of Dashboard is automated and done using a GitHub Action workflow.

1. Open the [Make release](https://github.com/capactio/dashboard/actions/workflows/make-release.yaml) workflow.
1. Click `Run workflow` and depending on your scenario:
   - if making a major/minor release from `main`, select the `main` branch and put the version in SemVer, e.g. `0.5.0`,
   - if making a patch release from a release branch, select the given release branch and put the version in SemVer, e.g. `0.5.1`.
1. Click `Run workflow` to start the release workflow.

### Release Capact container images and binaries

The release of Capact container images and binaries is automated and done using a GitHub Action workflow.

1. Open the [Make release](https://github.com/capactio/capact/actions/workflows/make-release.yaml) workflow.
1. Click `Run workflow` and depending on your scenario:
   - if making a major/minor release from `main`, select the `main` branch and put the version in SemVer, e.g. `0.5.0`,
   - if making a patch release from a release branch, select the given release branch and put the version in SemVer, e.g. `0.5.1`.
   - provide Dashboard image tag from a [`capactio/dashboard`](https://github.com/capactio/dashboard) release build.
1. Click `Run workflow` to start the release workflow.

The workflow will prepare the release branch, tag the appropriate commit and create a GitHub Release. [`gren`](https://github.com/github-tools/github-release-notes) is used to create the release notes from merged pull requests.

### Release Hub manifests 

The release of Hub Manifests is automated and done using a GitHub Action workflow.

1. Open the [Make release](https://github.com/capactio/hub-manifests/actions/workflows/make-release.yaml) workflow.
1. Click `Run workflow` and put the version parameter and the runner image tag from a [`capactio/capact`](https://github.com/capactio/capact) release build.
1. Click `Run workflow` to start the release workflow.

### Validate the release

1. Install Capact locally from the version you've just released.
1. Run one of our manifests, such as Mattermost installation. Make sure it passes.

### Release documentation

The release of Capact documentation is automated and done using a GitHub Action workflow.
If you release a new major or minor Capact version, follow these steps:

1. Open the [Make release](https://github.com/capactio/website/actions/workflows/make-release.yaml) workflow.
1. Click `Run workflow` and for the version parameter, provide an already released Capact version.
1. Click `Run workflow` to start the release workflow.

To read more about documentation versioning, see the [Versioning](https://docusaurus.io/docs/versioning) page on the Docusaurus website.

### Further manual steps

1. For the [`capactio/website`](https://github.com/capactio/website) repository: Update announcement bar.
    1. Create pull request with announcement banner update (`themeConfig.announcementBar` in the [`docusaurus.config.js`](https://github.com/capactio/website/blob/main/docusaurus.config.js) file).
    1. Get review from any code owner and merge it.
1. For the [`capactio/capact`](https://github.com/capactio/capact) repository:
    1. Archive images from Helm charts and add to the GitHub release.
        1. Check out the release branch for the release you created.
        1. Make sure you track `upstream` release branch and you are on the latest commit.
        1. Run the following command:
            ```bash
            CAPACT_VERSION={version} # e.g. 0.5.0
            capact alpha archive-images helm -v --version ${CAPACT_VERSION} -o ./capact-images-amd64.tar.gz --compress gzip
            ```
        1. Once the archive is ready to upload, navigate to the [`capact` Releases](https://github.com/capactio/capact/releases) page and edit your release.
        1. Upload the archive as another attachment to the release and click **Update release** button.
    1. On the [`capact` Releases](https://github.com/capactio/capact/releases) page, edit the draft release with key highlights and publish it.
1. Share the news on our Slack and social media.

### Cleanup

1. For **all** of the following repositories:

    - [`capactio/capact`](https://github.com/capactio/capact)
    - [`capactio/hub-manifests`](https://github.com/capactio/hub-manifests)
    - [`capactio/dashboard`](https://github.com/capactio/dashboard)
    - [`capactio/website`](https://github.com/capactio/website)

    perform the following steps:

    - Reenable `main` and `release-*` branch protection rules
    - Remove `GH_PAT` secret from Release environments

1. Additionally, for the [`capactio/capact`](https://github.com/capactio/capact) repository, perform the following steps:

    - Remove `GCS_CREDS` secret from Release environments    
