module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    testMatch: ['**/src/test/**/*.test.ts'], 
    moduleFileExtensions: ['ts', 'js'],
    transform: {
      '^.+\\.ts?$': 'ts-jest',
    },
    moduleNameMapper: {
      '^@src/(.*)$': '<rootDir>/src/$1',  
    },
  };
  


