// WARNING: This file is modified automatically when the `hack/make-release.sh` script is executed:
//  - New version is appended to the `versions` array
//  - Wherever there is a redirect with the `next: true` version rule, the new release is appended
//
// We need to maintain custom redirects as it's not handled automatically by Docusaurus: https://github.com/facebook/docusaurus/issues/3407
// NOTE: Redirects don't work in development mode. Use `npm run build` and `npm run serve` to see them in action.
//
// https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-client-redirects

const versions = [
  "0.5",
  "0.4",
  "", // latest
  "next", // unreleased
];

const latestVersion = findLatestVersion(versions);

function generateDocsRedirectsForVersions(versions) {
  const redirects = [];
  for (let version of versions) {
    redirects.push(...generateDocsRedirectsForVersion(version));
  }

  return redirects;
}

function findLatestVersion(versions) {
  if (!versions) {
    throw new Error("versions cannot be empty");
  }

  return (
    versions
      .filter((item) => item != "" && item != "next")
      // source for this basic one-line semver comparison: https://stackoverflow.com/a/65687141
      .sort((a, b) =>
        b.localeCompare(a, undefined, { numeric: true, sensitivity: "base" })
      )[0]
  );
}

function generateDocsRedirectsForVersion(version) {
  const fromPrefix = version != "" ? `/docs/${version}` : "/docs";
  let toPrefix = fromPrefix;

  if (version === latestVersion) {
    // for the latest version, redirect to URL without version number
    toPrefix = "/docs";
  }

  const mapping = [
    {
      from: `${fromPrefix}`,
      to: `${toPrefix}/getting-started`,
      versions: {
        0.5: true,
        next: true,
      },
    },
    {
      from: `${fromPrefix}/installation`,
      to: `${toPrefix}/installation/local`,
      versions: {
        0.4: true,
        0.5: true,
        next: true,
      },
    },
    {
      from: `${fromPrefix}/example`,
      to: `${toPrefix}/example/mattermost-installation`,
      versions: {
        0.4: true,
        0.5: true,
        next: true,
      },
    },
    {
      from: `${fromPrefix}/content-development`,
      to: `${toPrefix}/content-development/guide`,
      versions: {
        0.4: true,
        0.5: true,
        next: true,
      },
    },
    {
      from: `${fromPrefix}/feature`,
      to: `${toPrefix}/feature/policies/overview`,
      versions: {
        0.4: true,
        0.5: true,
        next: true,
      },
    },
    {
      from: `${fromPrefix}/architecture`,
      to: `${toPrefix}/architecture/e2e-architecture`,
      versions: {
        0.4: true,
        0.5: true,
        next: true,
      },
    },
    {
      from: `${fromPrefix}/cli/commands`,
      to: `${toPrefix}/cli/commands/capact`,
      versions: {
        0.4: true,
        0.5: true,
        next: true,
      },
    },
    {
      from: `${fromPrefix}/operation`,
      to: `${toPrefix}/operation/common-problems`,
      versions: {
        0.4: true,
        0.5: true,
        next: true,
      },
    },
    {
      from: `${fromPrefix}/cli`,
      to: `${toPrefix}/cli/getting-started`,
      versions: {
        0.4: true,
        0.5: true,
        next: true,
      },
    },
    {
      from: `${fromPrefix}/dashboard-ui`,
      to: `${toPrefix}/dashboard-ui/overview`,
      versions: {
        next: true,
      },
    },
    // legacy redirects
    {
      from: `${fromPrefix}`,
      to: `${toPrefix}/introduction`,
      versions: {
        0.4: true,
      },
    },
    {
      from: `${fromPrefix}/development`,
      to: `${toPrefix}/development/development-guide`,
      versions: {
        0.4: true,
      },
    },
  ];

  const versionToCheck = version != "" ? version : latestVersion;
  return mapping
    .filter((item) => item.versions[versionToCheck])
    .map(({ from, to }) => ({ from, to }));
}

module.exports = () => {
  return generateDocsRedirectsForVersions(versions);
};
