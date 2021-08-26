#!/bin/bash
set -e

release::generate_docs() {
  npm run docusaurus docs:version "${RELEASE_VERSION_MAJOR_MINOR}"
  sed -i.bak -E "s/...generateDocsRedirectsForVersion\(".+", true\)/...generateDocsRedirectsForVersion(\"${RELEASE_VERSION_MAJOR_MINOR}\", true)/" "./redirects.js"
}

release::update_binary_links() {
  sed -i.bak "s/capactio-binaries\/v\([0-9]*\.[0-9]*\.[0-9]*\)/capactio-binaries\/v${RELEASE_VERSION}/g" ./docs/cli/getting-started.mdx
  sed -i.bak "s/capact-cli:v\([0-9]*\.[0-9]*\.[0-9]*\)/capact-cli:v${RELEASE_VERSION}/g" ./docs/cli/getting-started.mdx
}

release::make_commit() {
  git add .
  git commit -m "Release ${RELEASE_VERSION_MAJOR_MINOR} documentation"
  git push origin main
}

[ -z "${RELEASE_VERSION}" ] && echo "Need to set RELEASE_VERSION" && exit 1;
RELEASE_VERSION_MAJOR_MINOR="$(echo "${RELEASE_VERSION}" | sed -E 's/([0-9]+\.[0-9])\.[0-9]/\1/g')"

main() {
  release::generate_docs
  release::update_binary_links
  release::make_commit
}

main
