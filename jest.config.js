/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ["**/**/*.test.ts"],
  verbose: true,
  forceExit: true,
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
};