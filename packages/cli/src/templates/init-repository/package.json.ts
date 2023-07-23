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
    "@connery-io/cli": "^0.0.4",
    "jest": "^29.6.1"
  },
  "scripts": {
    "build": "connery build",
    "test": "jest"
  }
}
`;

export default content;
