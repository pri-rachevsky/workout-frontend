module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/src/infra/test/styleMock.js",
  },
  setupFilesAfterEnv: [
    "<rootDir>/src/setupTests.ts"
  ]
};