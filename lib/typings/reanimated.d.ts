declare module 'react-native-reanimated/lib/reanimated2/jestUtils' {
  function withReanimatedTimer(animations: () => void): void;
  function advanceAnimationByTime(time?: number): void;
  function advanceAnimationByFrame(count: number): void;
}
