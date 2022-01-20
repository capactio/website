// We need to maintain the custom redirects as the issue won't be resolved: https://github.com/facebook/docusaurus/issues/3407
// NOTE: Redirects don't work in development mode. Use `npm run build` and `npm run serve` to see them in action.
//
// https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-client-redirects

module.exports = () => {
  const redirects = [
    ...generateLegacy05DocsRedirectsForVersion(""), // latest version
    ...generateDocsRedirectsForVersion("next"), // unreleased version
    ...generateLegacy04DocsRedirectsForVersion("0.4"),
    ...generateLegacy05DocsRedirectsForVersion("0.5", true), // redirect from x.y version to latest
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
    {
      from: `${fromPrefix}/dashboard-ui`,
      to: `${toPrefix}/dashboard-ui/overview`,
    },
  ];
};

const generateLegacy04DocsRedirectsForVersion = (version, useLatestVersionAsTarget) => {
  const fromPrefix = version != "" ? `/docs/${version}` : "/docs";
  const toPrefix = useLatestVersionAsTarget ? `/docs` : fromPrefix;

	const currentRedirect = generateDocsRedirectsForVersion(version, useLatestVersionAsTarget).filter( item => {
		return item.to !== `${toPrefix}/getting-started` && item.to !== `${toPrefix}/dashboard-ui/overview`;
	})

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


const generateLegacy05DocsRedirectsForVersion = (version, useLatestVersionAsTarget) => {
  const fromPrefix = version != "" ? `/docs/${version}` : "/docs";
  const toPrefix = useLatestVersionAsTarget ? `/docs` : fromPrefix;

	return generateDocsRedirectsForVersion(version, useLatestVersionAsTarget).filter( item => {
		return item.to !== `${toPrefix}/dashboard-ui/overview`;
	})
};
