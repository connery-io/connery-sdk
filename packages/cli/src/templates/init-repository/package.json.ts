const content = `{
  "name": "{{connector.key}}",
  "description": "{{connector.description}}",
  "license": "MIT",
  "author": {
    "name": "{{author.name}}",
    "email": "{{author.email}}"
  },
  "dependencies": {},
  "devDependencies": {
    "@connery-io/cli": "*",
    "jest": "^29.6.1"
  },
  "scripts": {
    "build": "connery validate && connery build",
    "validate": "connery validate",
    "test": "jest"
  }
}
`;

export default content;
