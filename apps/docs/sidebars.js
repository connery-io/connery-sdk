const sidebars = {
  platformSidebar: [
    {
      label: "Introduction",
      type: "category",
      collapsible: false,
      collapsed: false,
      link: {
        type: 'doc',
        id: 'runner/introduction/index',
      },
      items: [
        'runner/introduction/core-concepts',
      ],
    },
    {
      label: "Quickstart",
      type: "category",
      collapsible: false,
      collapsed: false,
      link: {
        type: 'doc',
        id: 'runner/quick-start/index',
      },
      items: [
        'runner/quick-start/set-up-runner',
        'runner/quick-start/install-plugin-on-the-runner',
        'runner/quick-start/use-clients-to-call-actions',
      ],
    },
  ],
  pluginsSidebar: [
    'plugins/native',
    'plugins/community',
    {
      label: "Guides",
      type: "category",
      collapsible: false,
      collapsed: false,
      link: {
        type: 'doc',
        id: 'plugins/guides/index',
      },
      items: [
        'plugins/guides/create-plugin',
      ],
    }
  ],
  clientsSidebar: [
    {
      label: "Native clients",
      type: "category",
      collapsible: false,
      collapsed: false,
      link: {
        type: 'doc',
        id: 'clients/native/index',
      },
      items: [
        {
          label: "OpenAI",
          type: "category",
          collapsible: false,
          collapsed: false,
          link: {
            type: 'doc',
            id: 'clients/native/openai/index',
          },
          items: [
            'clients/native/openai/gpt',
            'clients/native/openai/assistant',
          ],
        },
        'clients/native/slack',
        'clients/native/make',
        'clients/native/langchain',
        'clients/native/api',
        'clients/native/cli',
      ],
    },
    'clients/community',
  ],
  useCasesSidebar: [
    {
      label: "Use cases",
      type: "category",
      collapsible: false,
      collapsed: false,
      link: {
        type: 'doc',
        id: 'use-cases/index',
      },
      items: [
        'use-cases/scale-back-end-service-on-aws-from-slack',
        'use-cases/send-email-from-a-custom-openai-gpt-using-connery-actions',
      ],
    }
  ],
};

module.exports = sidebars;
