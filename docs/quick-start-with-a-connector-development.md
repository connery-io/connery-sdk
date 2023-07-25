# Quick start with a connector development

> In this guide you learn all the necessary steps to start with the connector development real quick **using only your browser**.

## 1. Create a new public repository in GitHub

## 2. Create a new Codespace for the repository

Once the codespace is created and loaded you should see a VS Code editor in your browser with a "Terminal" tab open.

## 3. Initialize the connector repository

Run the following command in the terminal and follow the instructions. You will be asked a couple of questions needed for the connector repository initialization.

```
npx connery@latest init
```

Once the repository initialized, you should see the new files added.

## 4. Install dependences

```
npm install
```

## 5. Build connector

```
npm run build
```

## 6. Commit and push the files

Run the following command in the terminal to commit and push the files to GitHub.

```
git add . && git commit -m "Init connector repository" && git push origin main
```

## 7. (Run your action on the runner)

Link to the Runner configuration page

## 8. Add a new action to the connector

add new action

```
npx connery@latest add-action
```

build
commit

## 9. Install the connector on the runner

Link to the page here...

## Next steps

Learn more details about the connector development on this page...

Learn about the connector definition here...

Connector examples...

## End of work

When you finished your work on the connector, stop your codespace so you can use it longer for free.
When you want to work on your connector again, you can start the codespace from your repository.

## Related resources

- [Create a repo](https://docs.github.com/en/get-started/quickstart/create-a-repo?tool=webui)
- [Creating a codespace for a repository](https://docs.github.com/en/codespaces/developing-in-codespaces/creating-a-codespace-for-a-repository?tool=webui)
- [Stopping a codespace](https://docs.github.com/en/codespaces/developing-in-codespaces/stopping-and-starting-a-codespace?tool=webui)
- [About billing for GitHub Codespaces](https://docs.github.com/en/billing/managing-billing-for-github-codespaces/about-billing-for-github-codespaces#monthly-included-storage-and-core-hours-for-personal-accounts)
