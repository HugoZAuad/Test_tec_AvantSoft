const { createDefaultPreset } = require('ts-jest');
const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: 'src',
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    ...tsJestTransformCfg,
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!@nestjs-modules/ioredis)'],
  collectCoverage: true,
  collectCoverageFrom: ['modules/**/services/*.ts'],
  coverageDirectory: '../coverage',
  coverageThreshold: {
    global: {
      branches: 97,
      functions: 97,
      lines: 97,
      statements: 97,
    },
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/$1',
    '^generated/prisma/client$': '<rootDir>/../generated/prisma/client.js',
    '^generated/prisma(.*)$': '<rootDir>/../generated/prisma$1',
    '^src/modules/prisma/(.*)$': '<rootDir>/modules/prisma/$1',
  },
  clearMocks: true,
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/../tsconfig.json',
    },
  },
  verbose: true,
};
s