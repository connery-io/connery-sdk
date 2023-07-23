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
    "@connery-io/cli": "^0.0.4"
  },
  "scripts": {
    "build": "connery build"
  }
}
`;

export default content;
