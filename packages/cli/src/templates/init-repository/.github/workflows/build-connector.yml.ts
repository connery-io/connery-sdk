const content = `name: Build connector

on:
  push:
    branches:
      - main

concurrency:
  group: build-connector

jobs:
  build-connector:
    name: Build connector
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup NodeJS
        uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Install dependencies
        shell: bash
        run: npm install

      - name: Build connector
        shell: bash
        run: npm run build

      - name: Commit
        run: |
          git config --global user.name "GitHub Actions"
          git add dist/
          git commit -m "Update dist" || echo "No changes to commit"
          git push origin main
`;

export default content;
