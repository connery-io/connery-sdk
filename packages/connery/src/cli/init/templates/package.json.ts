export default `{
  "type": "module",
  "scripts": {
    "start": "tsc && node dist/index.js",
    "test": "jest --passWithNoTests",
    "format": "prettier --write ."
  },
  "dependencies": {
    "connery": "^0.0.40"
  },
  "devDependencies": {
    "@types/jest": "^29.5.6",
    "@types/nodemailer": "^6.4.14",
    "jest": "^29.6.1",
    "prettier": "^3.2.5",
    "ts-jest": "^29.1.1"
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
