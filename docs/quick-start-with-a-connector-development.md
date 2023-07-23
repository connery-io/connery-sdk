# Quick start with a connector development

> ℹ️ In this guide you learn how to start with the connector development real quick **using only your browser**.

### 1. Create a new public repository in GitHub

### 2. Create a new Codespace for the repository

Once the codespace is created and loaded you should see a VS Code editor in your browser with a "Terminal" tab open.

### 3. Initialize the connector repository

Run the following command in the terminal and follow the instructions. You will be asked a couple of questions needed for the connector repository initialization.

```
npx --yes @connery-io/cli@latest init
```

Once the repository initialized, you should see the new files added.

### 4. Commit and push the files

Run the following command in the terminal to commit and push the files to GitHub.

```
git add . && git commit -m "Init connector repository" && git push origin main
```

Now your files are synchronized to the `main` branch of your GitHub repository. The `main` branch is monitored by a GitHub Action workflow which automatically build and package your connector with all the dependencies into a `./dist/connector.js` file in the repository. This file is used by Connery Runner to run your connector.

You can find the "Build connector" workflow in the "Actions" tab of the repository.

### 5. (Run your action on the runner)

Link to the Runner configuration page

### 5. Add a new action to the connector

add new action

```
npx --yes @connery-io/cli@latest add-action
```

build it manually

commit and push the changes to the repository

### End of work

When you finished your work on the connector, please stop your codespace so you can use it longer for [free](https://docs.github.com/en/billing/managing-billing-for-github-codespaces/about-billing-for-github-codespaces#monthly-included-storage-and-core-hours-for-personal-accounts).
When you want to work on your connector again, you can start the codespace from your repository.
