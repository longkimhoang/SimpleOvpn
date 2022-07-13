import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useLayoutEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import NavigationBar from '../common/NavigationBar';
import {VpnServerListNavigationProps} from '../navigation/types';
import {useVpnGateClient, VpnServerRepository} from '../vpngate-client';
import {IVpnServer} from '../vpngate-client/models';
import ConnectionOptionsSheet from './components/ConnectionOptionsSheet';
import RefetchServersButton from './components/RefetchServersButton';
import VpnServerList from './components/VpnServerList';

//#region Typedefs

export interface VpnServerListScreenDeps {
  useVpnServerRepository: () => VpnServerRepository;
  useVpnServerListNavigation: () => Pick<
    VpnServerListNavigationProps,
    'setOptions'
  >;
}

export interface VpnServerListScreenProps {
  overrideDeps?: Partial<VpnServerListScreenDeps>;
}

//#endregion

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

function VpnServerListScreen({overrideDeps}: VpnServerListScreenProps) {
  const deps: VpnServerListScreenDeps = {
    ...overrideDeps,
    useVpnServerRepository: useVpnGateClient,
    useVpnServerListNavigation: useNavigation,
  };

  const {useVpnServerRepository, useVpnServerListNavigation} = deps;

  const {vpnServers, isFetching, fetchServers} = useVpnServerRepository();
  const navigation = useVpnServerListNavigation();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

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

  const handleItemPress = useCallback((server: IVpnServer) => {
    bottomSheetModalRef.current?.present(server);
  }, []);

  return (
    <View style={styles.root}>
      <LoadingIndicatorWrapper isFetching={isFetching} />

      <VpnServerList vpnServers={vpnServers} onItemPress={handleItemPress} />

      <ConnectionOptionsSheet ref={bottomSheetModalRef} />
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
