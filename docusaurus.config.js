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
      id: "capact_os_release",
      content: `🚀 The very first public Capact release is here! <a href="https://github.com/capactio/capact" target="_blank">Check out our repository and give us a star on GitHub!</a>`,
      backgroundColor: "var(--announcement-bar-background)",
      textColor: "var(--announcement-bar-text)",
      isCloseable: true,
    },
    colorMode: {
      defaultMode: "light",
      respectPrefersColorScheme: true,
    },
    algolia: {
      apiKey: "43ffd9615b1dd6ac0f6f9987e624d73d",
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
          title: "Community",
          items: [
            {
              label: "GitHub",
              to: "https://github.com/capactio/capact",
            },
            {
              label: "Slack",
              to: "/slack",
            },
          ],
        },
        {
          title: "Site Information",
          items: [
            {
              label: "Disclaimer",
              to: "/disclaimer",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Capact authors`,
    },
    // gtag: {
    //   // You can also use your "G-" Measurement ID here.
    //   trackingID: 'GTM-PH86LZ5',
    //   // Optional fields.
    //   anonymizeIP: true, // Should IPs be anonymized?
    // },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/capactio/website/edit/main/",
          showLastUpdateAuthor: false,
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
        redirects: [...getCustomRedirects()],
      },
    ],
    [
      require.resolve('docusaurus-gtm-plugin'),
      {
        id: 'GTM-PH86LZ5', // GTM Container ID
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
