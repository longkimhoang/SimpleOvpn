import React from 'react';
import {StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';

export interface LoadingIndicatorWrapperProps {
  isFetching: boolean;
}

function LoadingIndicatorWrapper({isFetching}: LoadingIndicatorWrapperProps) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isFetching ? 1 : 0),
    };
  }, [isFetching]);

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.loadingIndicator, animatedStyle]}
      testID="vpn-server-list.loading-indicator.container">
      <ActivityIndicator animating={isFetching} hidesWhenStopped={false} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  loadingIndicator: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
});

export default LoadingIndicatorWrapper;
