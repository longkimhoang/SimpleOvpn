import {render} from '@testing-library/react-native';
import React from 'react';
import LoadingIndicatorWrapper from '../LoadingIndicatorWrapper';
import {
  withReanimatedTimer,
  advanceAnimationByTime,
} from 'react-native-reanimated/lib/reanimated2/jestUtils';

describe('LoadingIndicatorWrapper', () => {
  test('render with isFetching = true', () => {
    withReanimatedTimer(() => {
      const tree = render(
        <LoadingIndicatorWrapper isFetching={true} />,
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  test('render with isFetching = false', () => {
    withReanimatedTimer(() => {
      const tree = render(
        <LoadingIndicatorWrapper isFetching={false} />,
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  test('given isFetching = true, container opacity is 1', () => {
    withReanimatedTimer(() => {
      const {queryByTestId} = render(
        <LoadingIndicatorWrapper isFetching={true} />,
      );

      const containerElement = queryByTestId(
        'vpn-server-list.loading-indicator.container',
      );

      expect(containerElement).toHaveAnimatedStyle({
        opacity: 1,
      });
    });
  });

  test('given isFetching = false, container opacity is 0', () => {
    withReanimatedTimer(() => {
      const {queryByTestId} = render(
        <LoadingIndicatorWrapper isFetching={false} />,
      );

      const containerElement = queryByTestId(
        'vpn-server-list.loading-indicator.container',
      );

      expect(containerElement).toHaveAnimatedStyle({
        opacity: 0,
      });
    });
  });

  test('given isFetching = true, when update isFetching to false, container will animate opacity from 1 to 0', () => {
    withReanimatedTimer(() => {
      const {queryByTestId, update} = render(
        <LoadingIndicatorWrapper isFetching={true} />,
      );

      const containerElement = queryByTestId(
        'vpn-server-list.loading-indicator.container',
      );

      expect(containerElement).toHaveAnimatedStyle({
        opacity: 1,
      });

      update(<LoadingIndicatorWrapper isFetching={false} />);

      // Default withTiming duration
      advanceAnimationByTime(300);

      expect(containerElement).toHaveAnimatedStyle({
        opacity: 0,
      });
    });
  });
});
