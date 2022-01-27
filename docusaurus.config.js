// eslint-disable-next-line @typescript-eslint/no-var-requires
const getCustomRedirects = require("./redirects.js");

const copyrightText = `Copyright © ${new Date().getFullYear()} Capact authors.`;

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
      id: "capact_60_release",
      content: `🚀  Say hello to Capact 0.6.0! <a href="https://github.com/capactio/capact" target="_blank">Check out our repository and give us a star on GitHub!</a>`,
      backgroundColor: "var(--announcement-bar-background)",
      textColor: "var(--announcement-bar-text)",
      isCloseable: true,
    },
    colorMode: {
      defaultMode: "light",
      respectPrefersColorScheme: true,
    },
    algolia: {
      appId: "TS68LPSTRZ",
      apiKey: "d1d582d9b2ecb80fc268594a6c1b0685",
      indexName: "capact",
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
          docId: "getting-started",
          position: "left",
          label: "Documentation",
        },
        {
          type: "doc",
          docId: "contributing",
          docsPluginId: "community",
          position: "left",
          label: "Community",
        },
        {
          to: "/blog",
          label: "Blog",
          position: "left",
        },
        {
          type: "docsVersionDropdown",
          position: "right",
        },
        {
          to: "/community/slack",
          position: "right",
          className: "header-icon-link slack-icon color-adjustable",
          "aria-label": "Slack",
        },
        {
          href: "https://github.com/capactio",
          position: "right",
          className: "header-icon-link github-icon color-adjustable",
          "aria-label": "GitHub",
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
          title: "Social",
          items: [
            {
              label: "Twitter",
              href: "https://twitter.com/capactio",
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
          title: "Community",
          items: [
            {
              label: "Contributing",
              to: "/community/contributing",
            },
            {
              label: "GitHub",
              to: "https://github.com/capactio/capact",
            },
            {
              label: "Slack",
              to: "/community/slack",
            },
          ],
        },
        {
          title: "Legal",
          items: [
            {
              label: "Disclaimer",
              to: "/disclaimer",
            },
            {
              label: "Cookie Policy",
              to: "/cookie-policy",
            },
          ],
        },
      ],
      copyright: copyrightText,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.docs.js"),
          editUrl: "https://github.com/capactio/website/edit/main/",
          showLastUpdateAuthor: false,
          showLastUpdateTime: true,
          versions: {
            current: {
              label: `Unreleased 🚧`,
            },
          },
        },
        blog: {
          showReadingTime: true,
          editUrl: "https://github.com/capactio/website/edit/main/",
          feedOptions: {
            type: "all",
            copyright: copyrightText,
          },
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        sitemap: {},
      },
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'community',
        path: 'community',
        routeBasePath: 'community',
        sidebarPath: require.resolve('./sidebars.community.js'),
      },
    ],
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [...getCustomRedirects()],
      },
    ],
    [
      require("./src/plugin/gtm.js"),
      {
        trackingID: 'GTM-PH86LZ5', // GTM Container ID
      }
    ]
  ],
  customFields: {
    github: {
      user: "capactio",
      repository: "capact",
    },
  },
};
