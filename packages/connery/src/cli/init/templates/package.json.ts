export default `{
  "type": "module",
  "scripts": {
    "start": "tsc && node dist/index.js",
    "test": "jest --passWithNoTests",
    "format": "prettier --write ."
  },
  "dependencies": {
    "connery": "^0.1.0"
  },
  "devDependencies": {
    "@types/jest": "^29.5.6",
    "jest": "^29.6.1",
    "ts-jest": "^29.1.1",
    "prettier": "^3.2.5"
  },
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "node"
  },
  "prettier": {
    "printWidth": 120,
    "singleQuote": true,
    "trailingComma": "all"
  }
}
`;
