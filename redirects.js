// Remove the custom redirects until the issue is resolved: https://github.com/facebook/docusaurus/issues/3407
// NOTE: Redirects don't work in development mode. Use `npm run build` and `npm run serve` to see them in action.
//
// https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-client-redirects

module.exports = () => {
  const redirects = [
    ...generateDocsRedirectsForVersion(""), // latest version
    ...generateDocsRedirectsForVersion("next"), // unreleased version
    ...generateLegacyDocsRedirectsForVersion("0.4"),
    ...generateDocsRedirectsForVersion("0.5", true), // redirect from x.y version to latest
  ];

  return redirects;
};

const generateDocsRedirectsForVersion = (version, useLatestVersionAsTarget) => {
  const fromPrefix = version != "" ? `/docs/${version}` : "/docs";
  const toPrefix = useLatestVersionAsTarget ? `/docs` : fromPrefix;

  return [
    {
      from: `${fromPrefix}`,
      to: `${toPrefix}/getting-started`,
    },
    {
      from: `${fromPrefix}/installation`,
      to: `${toPrefix}/installation/local`,
    },
    {
      from: `${fromPrefix}/example`,
      to: `${toPrefix}/example/mattermost-installation`,
    },
    {
      from: `${fromPrefix}/content-development`,
      to: `${toPrefix}/content-development/guide`,
    },
    {
      from: `${fromPrefix}/feature`,
      to: `${toPrefix}/feature/policies/overview`,
    },
    {
      from: `${fromPrefix}/architecture`,
      to: `${toPrefix}/architecture/e2e-architecture`,
    },
    {
      from: `${fromPrefix}/cli/commands`,
      to: `${toPrefix}/cli/commands/capact`,
    },
    {
      from: `${fromPrefix}/operation`,
      to: `${toPrefix}/operation/common-problems`,
    },
    {
      from: `${fromPrefix}/cli`,
      to: `${toPrefix}/cli/getting-started`,
    },
  ];
};

const generateLegacyDocsRedirectsForVersion = (version, useLatestVersionAsTarget) => {
  const fromPrefix = version != "" ? `/docs/${version}` : "/docs";
  const toPrefix = useLatestVersionAsTarget ? `/docs` : fromPrefix;

  const currentRedirect = generateDocsRedirectsForVersion(version, useLatestVersionAsTarget).splice(0, 1)
  return [
    ...currentRedirect,
    {
      from: `${fromPrefix}`,
      to: `${toPrefix}/introduction`,
    },
    {
      from: `${fromPrefix}/development`,
      to: `${toPrefix}/development/development-guide`,
    },
  ];
};
