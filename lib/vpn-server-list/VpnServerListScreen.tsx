import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import NavigationBar from '../common/NavigationBar';
import {VpnServerListNavigationProps} from '../navigation/types';
import {useVpnGateClient} from '../vpngate-client';
import RefetchServersButton from './components/RefetchServersButton';
import VpnServerList from './components/VpnServerList';

const LoadingIndicatorWrapper: React.FC<{isFetching: boolean}> = ({
  isFetching,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: isFetching ? 1 : 0,
    };
  }, [isFetching]);

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.loadingIndicator, animatedStyle]}>
      <ActivityIndicator animating={isFetching} hidesWhenStopped={false} />
    </Animated.View>
  );
};

function VpnServerListScreen() {
  const {vpnServers, isFetching, fetchServers} = useVpnGateClient();
  const navigation = useNavigation<VpnServerListNavigationProps>();

  useEffect(() => {
    if (vpnServers.length > 0) {
      return;
    }

    const ac = new AbortController();

    fetchServers({signal: ac.signal});

    return () => {
      ac.abort();
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: props => (
        <NavigationBar
          {...props}
          headerRight={() => (
            <RefetchServersButton fetchServers={fetchServers} />
          )}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.root}>
      <LoadingIndicatorWrapper isFetching={isFetching} />

      <VpnServerList vpnServers={vpnServers} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    flex: 1,
  },
  loadingIndicator: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
});

export default VpnServerListScreen;
