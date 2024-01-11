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
        {
          label: "LangChain",
          type: "category",
          collapsible: false,
          collapsed: false,
          link: {
            type: 'doc',
            id: 'clients/native/langchain/index',
          },
          items: [
            'clients/native/langchain/tools',
            'clients/native/langchain/opengpts',
          ],
        },
        'clients/native/slack',
        'clients/native/make',
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
        'use-cases/private-ai-actions-control-center/index',
        {
          label: "Automations in Team Collaboration tools",
          type: "category",
          collapsible: true,
          collapsed: true,
          link: {
            type: 'doc',
            id: 'use-cases/automations-in-team-collaboration-tools/index',
          },
          items: [
            'use-cases/automations-in-team-collaboration-tools/scale-back-end-service-on-aws-from-slack',
          ]
        },
        'use-cases/custom-actions-in-no-code-tools/index',
        'use-cases/ci-cd-automations/index',
      ],
    }
  ],
};

module.exports = sidebars;
