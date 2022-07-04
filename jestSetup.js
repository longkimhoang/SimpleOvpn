import '@testing-library/jest-native';

require('react-native-reanimated/lib/reanimated2/jestUtils').setUpTests();

jest.mock('@react-navigation/native/lib/commonjs/useBackButton', () => ({
  default: () => {},
  __esModule: true,
}));

jest.mock('@react-navigation/native/lib/commonjs/useLinking.native', () => ({
  default: () => ({getInitialState: {then: jest.fn()}}),
  __esModule: true,
}));
