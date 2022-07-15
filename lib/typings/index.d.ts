import type {ViewStyle, ImageStyle, TextStyle} from 'react-native';
import type {AnimatedStyleProp} from 'react-native-reanimated';

export {};

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveAnimatedStyle<
        S extends AnimatedStyleProp<ViewStyle | ImageStyle | TextStyle>,
      >(
        expectedStyle: S,
      ): R;
    }
  }
}
