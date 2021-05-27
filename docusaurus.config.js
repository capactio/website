/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "Capact",
  tagline: "A simple way to manage applications and infrastructure.",
  url: "https://capact.io",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "capactio", // Usually your GitHub org/user name.
  projectName: "website", // Usually your repo name.
  themeConfig: {
    announcementBar: {
      id: "support_us", // Any value that will identify this message.
      content:
        "⚠️ Capact website is under heavy development. Come back visit us soon!",
      backgroundColor: "#fafbfc", // Defaults to `#fff`.
      textColor: "#091E42", // Defaults to `#000`.
      isCloseable: true, // Defaults to `true`.
    },
    colorMode: {
      defaultMode: "light",
      respectPrefersColorScheme: true,
    },
    algolia: {
      apiKey: "YOUR_API_KEY", // TODO:
      indexName: "YOUR_INDEX_NAME", // TODO:
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
          to: "/blog",
          label: "Blog",
          position: "left"
        }, // TODO: Link to external blog or use built-in
        {
          type: "docsVersionDropdown",
          position: "right",
        },
        {
          to: "/slack",
          position: "right",
          className: 'slack-icon-link',
          'aria-label': 'Slack',
        },
        {
          href: "https://github.com/capactio",
          position: "right",
          className: 'github-icon-link',
          'aria-label': 'GitHub',
        },
        {
          html: `<iframe src="https://ghbtns.com/github-btn.html?user=twbs&repo=bootstrap&type=star&count=true" frameborder="0" scrolling="0" width="150" height="20" title="GitHub"></iframe>`,
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
              to: "/docs/installation",
            },
            {
              label: "Examples",
              to: "/docs/example",
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
              href: "https://www.youtube.com/c/capactio", // TODO:
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
          // Please change this to your repo.
          editUrl: "https://github.com/capactio/capact/edit/main/docs/",
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          versions: {
            current: {
              label: `Unreleased 🚧`,
            },
          },
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: "https://github.com/capactio/website/edit/main/blog/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        sitemap: {},
      },
    ],
  ],
  customFields: {
    github: {
      // TODO: Change this
      user: "twbs",
      repository: "bootstrap",
    },
  },
};
