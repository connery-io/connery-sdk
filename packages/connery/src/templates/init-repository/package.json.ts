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
    "connery": "*",
    "jest": "^29.6.1"
  },
  "scripts": {
    "build": "jest --passWithNoTests && connery validate && connery build"
  }
}
`;

export default content;
