# Capact release process

This document describes Capact release process.

## Prerequisites

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- An GitHub Environment named `Release` on [`capactio/capact`](https://github.com/capactio/capact) repository with the following secrets set:
  - `GCS_CREDS` — Base64 encoded Google Cloud Platform credentials in JSON format to access Google Cloud Storage for binary and chart releases,
  - `GITHUB_PAT` — GitHub personal access token with permissions to make commits to repository.

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

### Prepare Hub for release 

1. Checkout the [hub-manifests](https://github.com/capactio/hub-manifests) repository destination branch for the pull request.

    - For major and minor release versions, set the destination branch to `main`. 
    - For patch releases, set the destination to corresponding release branch. For example, for `0.3.1` release, checkout the `release-0.3` branch.

    ```bash
    git checkout {destination-branch}
    ```

1. Create and checkout new branch:
    
   ```bash
   git checkout -b prepare-${RELEASE_VERSION}
   ```   

1. Replace all Runners images in [`manifests/implementation/runner`](https://github.com/capactio/hub-manifests/tree/main/manifests/implementation/runner) to release versions.
   
1. Review and commit the changes:

   ```bash
   git add .
   git commit -m "Update Runners images to release versions"
   ```
    
1. Create the pull request from the branch.
   
   - As the pull request target branch, pick the proper destination branch from the first step of this section.
    
1. Merge the pull request.

## Release documentation

If you release a new major or minor Capact version, follow these steps:

1. Clone the [`website`](https://github.com/capactio/website) repository locally.

1. Follow instructions from the [`README.md`](https://github.com/capactio/website/blob/main/README.md) document to fulfill all prerequisites.

1. Create and checkout new branch:
    
   ```bash
   git checkout -b prepare-${RELEASE_MAJOR_MINOR_VERSION}
   ```

1. Synchronize Capact CLI documentation according to the [Synchronize CLI documentation](https://github.com/capactio/website/blob/main/README.md#synchronize-cli-documentation) section.

1. Run the following command:
    
    ```bash
    npm run docusaurus docs:version ${RELEASE_MAJOR_MINOR_VERSION}
    ```

1. Update redirects in the [`redirects.js`](https://github.com/capactio/website/blob/main/redirects.js) file to make sure we point to proper documents for all documentation versions:

    For example, for `0.3` release, change the line:

    ```javascript
    ...generateDocsRedirectsForVersion("0.2", ""), // redirect from 0.2 to latest
    ```

    to:

    ```javascript
    ...generateDocsRedirectsForVersion("0.2"),
    ...generateDocsRedirectsForVersion("0.3", ""), // redirect from 0.3 to latest
    ```

1. Update stable release version for Capact binaries:   

    ```bash
    sed -i.bak "s/capactio-binaries\/v\([0-9]*\.[0-9]*\.[0-9]*\)/capactio-binaries\/v${RELEASE_VERSION}/g" ./docs/cli/getting-started.mdx
    sed -i.bak "s/capact-cli:v\([0-9]*\.[0-9]*\.[0-9]*\)/capact-cli:v${RELEASE_VERSION}/g" ./docs/cli/getting-started.mdx
    ```

1. Commit and push the changes

    ```bash
    git add .
    git commit -m "Release ${RELEASE_MAJOR_MINOR_VERSION} documentation"
    git push -u origin prepare-${RELEASE_MAJOR_MINOR_VERSION}
    ```

1. Create a new pull request for the `website` repository.

1. Merge the pull request.

To read more about documentation versioning, see the [Versioning](https://docusaurus.io/docs/versioning) page on the Docusaurus website.
