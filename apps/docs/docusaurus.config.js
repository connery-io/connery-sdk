// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Connery',
  url: 'https://docs.connery.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
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
          editUrl: 'https://github.com/connery-io/connery/tree/main/apps/docs/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-R8J5J4L3DQ',
          anonymizeIP: false,
        },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Connery',
        items: [
          {
            type: 'doc',
            position: 'left',
            docId: 'introduction/index',
            label: 'Docs',
          },
          {
            type: 'doc',
            position: 'left',
            docId: 'plugins',
            label: 'Plugins',
          },
          {
            type: 'doc',
            position: 'left',
            docId: 'native-clients/index',
            label: 'Clients',
          },
          {
            href: 'https://github.com/connery-io/connery',
            label: 'GitHub',
            position: 'right',
          },
          {
            href: 'https://connery.io',
            label: 'Website',
            position: 'right',
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      algolia: {
        appId: 'NM2Q08XMHT',
        apiKey: 'c1bc512e003f927e6a5bbe116e80a49c',
        indexName: 'connery',
        insights: true,
      }
    }),
};

module.exports = config;
