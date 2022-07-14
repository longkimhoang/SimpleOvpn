// @ts-check

/** @type import('@jest/types').Config.InitialOptions */
const config = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: [
    './jestSetup.js',
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|react-native-reanimated/lib/reanimated2|react-native-reanimated/lib|react-native-iphone-x-helper|react-native-paper|react-native-vector-icons|react-native-redash)/)',
  ],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  testResultsProcessor: 'jest-sonar-reporter',
};

module.exports = config;
