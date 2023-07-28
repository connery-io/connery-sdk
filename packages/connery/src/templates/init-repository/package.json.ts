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
    "test": "jest --passWithNoTests",
    "build": "jest --passWithNoTests && connery validate && connery build"
  }
}
`;

export default content;
