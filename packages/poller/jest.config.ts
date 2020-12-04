module.exports = {
  verbose: true,
  preset: 'ts-jest',
  moduleNameMapper: {
    '^solax-common/(.*)$': '<rootDir>/../common/src/$1',
    '^@/(.*)$': '<rootDir>/src/$1'
  }
}
