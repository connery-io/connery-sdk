const sidebars = {
  docsSidebar: [
    {
      type: "category",
      label: "Introduction",
      collapsible: false,
      collapsed: false,
      items: [
        'introduction/core-concepts',
        'introduction/use-cases',
      ],
      link: {
        type: 'doc',
        id: 'introduction/index',
      },
    },
    {
      type: "category",
      label: "Getting strated",
      collapsible: false,
      collapsed: false,
      items: [
        'getting-started/set-up-runner',
        'getting-started/install-connector-on-the-runner',
        'getting-started/use-clients-to-call-actions',
      ],
      link: {
        type: 'doc',
        id: 'getting-started/index',
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
      label: "Clients",
      collapsible: false,
      collapsed: false,
      items: [
        'clients/slack',
        'clients/make',
        'clients/langchain',
        'clients/api',
      ],
      link: {
        type: 'doc',
        id: 'clients/index',
      },
    },
  ]
};

module.exports = sidebars;
