// eslint-disable-next-line @typescript-eslint/no-var-requires
const getCustomRedirects = require("./redirects.js");

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "Capact",
  tagline: "A simple way to manage applications and infrastructure.",
  url: "https://capact.io",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "capactio",
  projectName: "website",
  themeConfig: {
    announcementBar: {
      id: "work_in_progress",
      content:
        "⚠️ Capact website is under heavy development. Come back and visit us soon!",
      backgroundColor: "#fafbfc",
      textColor: "#091E42",
      isCloseable: true,
    },
    colorMode: {
      defaultMode: "light",
      respectPrefersColorScheme: true,
    },
    algolia: {
      // TODO: Once we publish capact.io website, request API key from Algolia
      apiKey: "YOUR_API_KEY",
      indexName: "YOUR_INDEX_NAME",
      contextualSearch: true,
    },
    navbar: {
      title: "Capact",
      logo: {
        alt: "Capact Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "doc",
          docId: "introduction",
          position: "left",
          label: "Documentation",
        },
        {
          type: "docsVersionDropdown",
          position: "right",
        },
        {
          to: "/slack",
          position: "right",
          className: "slack-icon-link",
          "aria-label": "Slack",
        },
        {
          href: "https://github.com/capactio",
          position: "right",
          className: "github-icon-link",
          "aria-label": "GitHub",
        },
        {
          html: `<iframe src="https://ghbtns.com/github-btn.html?user=capactio&repo=capact&type=star&count=true" frameborder="0" scrolling="0" width="150" height="20" title="GitHub"></iframe>`,
        },
      ],
    },
    footer: {
      style: "light",
      links: [
        {
          title: "Learn",
          items: [
            {
              label: "Introduction",
              to: "/docs/introduction",
            },
            {
              label: "Installation",
              to: "/docs/installation/local",
            },
            {
              label: "Examples",
              to: "/docs/example/mattermost-installation",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Slack",
              to: "/slack",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/CapactIO",
            },
            {
              label: "YouTube",
              href: "https://www.youtube.com/channel/UCajXtDttqVuZ_Bl7M3_qA8w",
            },
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/company/72586376/",
            },
          ],
        },
        {
          title: "GitHub",
          items: [
            {
              html: `<iframe src="https://ghbtns.com/github-btn.html?user=capactio&repo=capact&type=star" frameborder="0" scrolling="0" width="150" height="20" title="GitHub"></iframe>`,
            },
            {
              html: `<iframe src="https://ghbtns.com/github-btn.html?user=capactio&repo=capact&type=fork" frameborder="0" scrolling="0" width="150" height="20" title="GitHub"></iframe>`,
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Capact authors`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/capactio/capact/edit/main/",
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          versions: {
            current: {
              label: `Unreleased 🚧`,
            },
          },
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        sitemap: {},
      },
    ],
  ],
  plugins: [
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          ...getCustomRedirects(),
        ],
      },
    ],
  ],
  customFields: {
    github: {
      user: "capactio",
      repository: "capact",
    },
  },
};
