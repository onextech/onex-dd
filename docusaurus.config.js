// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const theme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'One X Tech',
  tagline: 'Product Guide',
  url: 'https://www.onextech.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'One X Tech', // Usually your GitHub org/user name.
  projectName: 'onex-dd', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'One X Tech',
        logo: {
          alt: 'One X Tech Logo',
          src: 'img/logo.png',
        },
        items: [
          // Left
          { to: 'docs/introduction', label: 'Docs', position: 'left' },
          { to: 'docs/installation', label: 'Installation', position: 'left' },
          // Right
          {
            label: 'Resources',
            items: [
              { label: 'One X Tech', href: 'https://onextech.com' },
            ],
          },
          { type: 'docsVersionDropdown', position: 'right' },
        ],
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true,
        },
      },
      footer: {
        copyright: `Copyright ©${(new Date).getFullYear()} One X Tech`,
      },
      prism: {
        theme,
        darkTheme: theme,
      },
    }),
};

module.exports = config;
