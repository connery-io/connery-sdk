const sidebars = {
  docsSidebar: [
    {
      type: "category",
      label: "Introduction",
      collapsible: false,
      collapsed: false,
      items: [
        'introduction/core-concepts',
        'introduction/connector-ecosystem',
        'introduction/use-cases',
      ],
      link: {
        type: 'doc',
        id: 'introduction/index',
      },
    },
    {
      type: "category",
      label: "Quickstart",
      collapsible: false,
      collapsed: false,
      items: [
        'quick-start/set-up-runner',
        'quick-start/install-connector-on-the-runner',
        'quick-start/use-clients-to-call-actions',
      ],
      link: {
        type: 'doc',
        id: 'quick-start/index',
      },
    },
    {
      type: "category",
      label: "Guides",
      collapsible: false,
      collapsed: false,
      items: [
        'guides/create-connector',
      ],
      link: {
        type: 'doc',
        id: 'guides/index',
      },
    }
  ],
  clientsSidebar: [
    {
      type: "category",
      label: "Native Clients",
      collapsible: false,
      collapsed: false,
      items: [
        'native-clients/slack',
        'native-clients/make',
        'native-clients/langchain',
        'native-clients/api',
      ],
      link: {
        type: 'doc',
        id: 'native-clients/index',
      },
    },
    'community-clients',
  ]
};

module.exports = sidebars;
