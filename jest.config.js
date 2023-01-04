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
    '\\.(css|less)$': '<rootDir>/src/test/styleMock.js',
  },
  setupFilesAfterEnv: [
    "<rootDir>/src/setupTests.ts"
  ]
};