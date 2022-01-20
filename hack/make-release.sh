#!/bin/bash
set -e

release::generate_docs() {
  local -r version="$1"

  npm run docusaurus docs:version "${version}"
  sed -i.bak -E "s|// Append new version here|// Append new version here\n  \"${version}\",|" "./redirects.js"
  sed -i.bak -E "s|next: true,|${version}: true,\n        next: true,|" "./redirects.js"
}

release::update_binary_links() {
  local -r version="$1"

  sed -i.bak -E "s|(https://github.com/capactio/capact/releases/download/v)([0-9]*\.[0-9]*\.[0-9]*)|\1${version}|g" ./docs/cli/getting-started.mdx
  sed -i.bak -E "s|(ghcr.io/capactio/tools/capact-cli:v)([0-9]*\.[0-9]*\.[0-9]*)|\1${version}|g" ./docs/cli/getting-started.mdx
}

release::make_commit() {
  local -r version="$1"

  git add .
  git commit -m "Release ${version} documentation"
  git push origin main
}

[ -z "${RELEASE_VERSION}" ] && echo "Need to set RELEASE_VERSION" && exit 1;
RELEASE_VERSION_MAJOR_MINOR="$(echo "${RELEASE_VERSION}" | sed -E 's/([0-9]+\.[0-9])\.[0-9]/\1/g')"

main() {
  release::update_binary_links "${RELEASE_VERSION}"
  release::generate_docs "${RELEASE_VERSION_MAJOR_MINOR}"
  release::make_commit "${RELEASE_VERSION}"
}

main
