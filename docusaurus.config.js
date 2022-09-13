// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const theme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'One X Tech',
  tagline: 'Developer Guides',
  url: 'https://www.onextech.com.sg/',
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
          {
            type: 'doc',
            docId: 'product-guide',
            position: 'left',
            label: 'Documentations',
          },
        ],
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true,
        },
      },
      footer: {
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Product Guide',
                to: '/docs/product-guide',
              },
            ],
          },
        ],
        copyright: `Copyright © 2022 One X Tech

        `,
      },
      prism: {
        theme,
        darkTheme: theme,
      },
    }),
};

module.exports = config;
