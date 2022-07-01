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
    'node_modules/(?!(@react-native|react-native|react-native-reanimated/lib/reanimated2|@realm/react)/)',
  ],
};

module.exports = config;
