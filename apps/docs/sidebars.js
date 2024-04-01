const sidebars = {
  docsSidebar: [
    {
      label: "Introduction",
      type: "category",
      collapsible: true,
      collapsed: true,
      link: {
        type: 'doc',
        id: 'introduction/index',
      },
      items: [
        'introduction/core-concepts',
      ],
    },
    {
      label: "Quickstart",
      type: "category",
      collapsible: true,
      collapsed: true,
      link: {
        type: 'doc',
        id: 'quickstart/index',
      },
      items: [
        'quickstart/create-plugin',
        'quickstart/use-plugin',
      ],
    },
    {
      label: "SDK",
      type: "category",
      collapsible: true,
      collapsed: true,
      link: {
        type: 'doc',
        id: 'sdk/index',
      },
      items: [
        {
          label: "Plugin server",
          type: "category",
          collapsible: true,
          collapsed: true,
          link: {
            type: 'doc',
            id: 'sdk/plugin-server/index',
          },
          items: [
            'sdk/plugin-server/configuration',
            'sdk/plugin-server/connection-string',
            'sdk/plugin-server/rest-api',
          ],
        },
        'sdk/api-reference',
      ],
    },
    {
      label: "CLI",
      type: "category",
      collapsible: true,
      collapsed: true,
      link: {
        type: 'doc',
        id: 'cli/index',
      },
      items: [
        'cli/connery-dev-init',
        'cli/connery-dev-add-action',
      ],
    },
  ],
  pluginsSidebar: [
    'plugins/index',
  ],
  clientsSidebar: [
    {
      label: "Clients",
      type: "category",
      collapsible: false,
      collapsed: false,
      link: {
        type: 'doc',
        id: 'clients/index',
      },
      items: [
        {
          label: "OpenAI",
          type: "category",
          collapsible: true,
          collapsed: false,
          link: {
            type: 'doc',
            id: 'clients/openai/index',
          },
          items: [
            'clients/openai/gpt',
            'clients/openai/assistant',
          ],
        },
        {
          label: "LangChain",
          type: "category",
          collapsible: true,
          collapsed: false,
          link: {
            type: 'doc',
            id: 'clients/langchain/index',
          },
          items: [
            'clients/langchain/toolkit',
            'clients/langchain/opengpts',
          ],
        },
        'clients/slack',
        'clients/make',
      ],
    },
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
        {
          label: "Actions in GPTs",
          type: "category",
          collapsible: true,
          collapsed: true,
          link: {
            type: 'doc',
            id: 'use-cases/actions-in-gpts/index',
          },
          items: [
            'use-cases/actions-in-gpts/send-email-from-a-custom-openai-gpt',
          ]
        },
        'use-cases/actions-in-ai-agents-and-apps/index',
        'use-cases/actions-in-ai-wearables/index',
        {
          label: "Actions in team collaboration tools",
          type: "category",
          collapsible: true,
          collapsed: true,
          link: {
            type: 'doc',
            id: 'use-cases/actions-in-team-collaboration-tools/index',
          },
          items: [
            'use-cases/actions-in-team-collaboration-tools/scale-back-end-service-on-aws-from-slack',
          ]
        },
        'use-cases/custom-actions-in-no-code-tools/index',
        'use-cases/actions-in-ci-cd-pipelines/index',
      ],
    }
  ],
};

module.exports = sidebars;
