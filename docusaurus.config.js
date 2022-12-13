// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const title = 'One X Tech'
const theme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: `${title} Docs`,
  tagline: `Documentation for accessing products developed by ${title}.`,
  url: 'https://www.onextech.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: title, // Usually your GitHub org/user name.
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
        title,
        logo: {
          alt: `${title} Logo`,
          src: 'img/logo.png',
        },
        items: [
          // Left
          { to: 'docs/introduction', label: 'Docs', position: 'left' },
          // Right
          {
            label: 'Resources',
            items: [
              { label: title, href: 'https://onextech.com' },
              { label: 'NextJS', href: 'https://nextjs.org/' },
              { label: 'Vercel', href: 'https://vercel.com/' },
              { label: 'MUI', href: 'https://mui.com/' },
            ],
          },
        ],
      },
      footer: {
        copyright: `Copyright ©${(new Date).getFullYear()} ${title}`,
      },
      prism: {
        theme,
        darkTheme: theme,
      },
    }),
};

module.exports = config;
