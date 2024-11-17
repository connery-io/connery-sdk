---
description: Learn how to create a new plugin with actions.
icon: arrow-progress
layout:
  title:
    visible: true
  description:
    visible: true
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
---

# Create a plugin

## 1. Create a new GitHub repository

The repository will be used to store the plugin code and configuration.

<details>

<summary>Steps to create a repository</summary>

Open the [GitHub repository creation page](https://github.com/new) and follow the instructions below.

1. Select the **Owner** of the repository.
2. Enter the **Repository name**. This is also the name of your future plugin. We recommend using the snake case naming convention. For example, if you decide to call your plugin **My first plugin**, the repository name should be `my-first-plugin`.
3. Select the **Public** repository visibility.
4. Select the **Add a README file** option to initialize the repository with a README file. It will also create a new default branch for the repository.
5. Choose the **MIT License** as the license for the repository.
6. Please ensure the branch name is `main` as it is used across the docs. You can use any branch name but must be aware of it when following the docs.
7. Click the **Create repository** button.

</details>

## 2. Set up development environment

{% include "../.gitbook/includes/set-up-development-environment.md" %}

## 3. Initialize the plugin repository <a href="#id-3-initialize-the-plugin-repository" id="id-3-initialize-the-plugin-repository"></a>

Use the [`connery dev init`](../cli-reference/connery-dev-init.md) CLI command to initialize the plugin repository with all the necessary files and configuration.

```
npx connery@latest dev init
```

This command will also create a sample action for you to explore and test.

## 4. Install dependencies

{% include "../.gitbook/includes/install-dependencies.md" %}

## 5. Add a new action to the plugin (optional)

Use the [`connery dev add-action`](../cli-reference/connery-dev-add-action.md) CLI command to add a new action to the plugin.

```
npx connery@latest dev add-action
```

## 6. Implement the action (optional)

Open the `./src/actions` directory and find the newly created action file, define the input and output parameters of the action and implement the logic of the action in the `handler` function.

Use the sample action as an example and draw inspiration from [existing open-source plugins](../get-started/open-source-plugins.md).

<details>

<summary>Install additional NPM packages if required</summary>

During the development, you may need to install additional packages. For example, the [`axios`](https://github.com/axios/axios) package to make HTTP requests to external APIs. To install it and add it to the `./package.json` file, run the following command:

```
npm install axios --save
```

In the same way, you can install any other NPM package.

</details>

## 7. Start the plugin server

{% include "../.gitbook/includes/start-the-plugin-server.md" %}

## 8. Run the action (optional)

Let's run the plugin's sample action to see how it works. This is helpful for testing the action during the development process.

Use the following command to run the action from the plugin server. You should receive a response with the result of the action execution. The plugin server must be running to run the action.

```
curl -X 'POST' \
  'http://localhost:4201/api/actions/sampleAction/run' \
  -H 'accept: application/json' \
  -H 'x-api-key: 123456' \
  -H 'Content-Type: application/json' \
  -d '{
  "input": {
    "number1": "1",
    "number2": "2"
  }
}'
```

<details>

<summary>Command explanation</summary>

In this example, we use the [plugin server](../advanced/plugin-server.md) URL, `http://localhost:4201`, along with the sample action name, `sampleAction`, which was generated during initialization.&#x20;

The action expects input parameters `number1` and `number2`. Additionally, we use the default [API Key](../advanced/plugin-server.md#api\_key) to authenticate the request.

</details>

## 9. Commit the files

Run the following command to commit and push all the files to GitHub.

```
git add . && git commit -m "Init plugin repository" && git push origin main
```

{% hint style="warning" %}
Make sure you delete all the secrets you might be using during testing before pushing the changes to the repository.
{% endhint %}

