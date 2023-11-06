const sidebars = {
  platformSidebar: [
    {
      type: "category",
      label: "Introduction",
      collapsible: false,
      collapsed: false,
      items: [
        'platform/introduction/core-concepts',
        'platform/introduction/ecosystem',
        'platform/introduction/features',
        'platform/introduction/use-cases',
      ],
      link: {
        type: 'doc',
        id: 'platform/introduction/index',
      },
    },
    {
      type: "category",
      label: "Quickstart",
      collapsible: false,
      collapsed: false,
      items: [
        'platform/quick-start/set-up-runner',
        'platform/quick-start/install-plugin-on-the-runner',
        'platform/quick-start/use-clients-to-call-actions',
      ],
      link: {
        type: 'doc',
        id: 'platform/quick-start/index',
      },
    },
  ],
  pluginsSidebar: [
    'plugins/native',
    'plugins/community',
    {
      type: "category",
      label: "Guides",
      collapsible: false,
      collapsed: false,
      items: [
        'plugins/guides/create-plugin',
      ],
      link: {
        type: 'doc',
        id: 'plugins/guides/index',
      },
    }
  ],
  clientsSidebar: [
    {
      type: "category",
      label: "Native clients",
      collapsible: false,
      collapsed: false,
      items: [
        'clients/native/slack',
        'clients/native/make',
        'clients/native/api',
        'clients/native/cli',
        'clients/native/langchain',
      ],
      link: {
        type: 'doc',
        id: 'clients/native/index',
      },
    },
    'clients/community',
  ]
};

module.exports = sidebars;
