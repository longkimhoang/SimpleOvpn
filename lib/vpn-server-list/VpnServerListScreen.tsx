import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useLayoutEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import {VpnServerListNavigationProps} from '../navigation/types';
import {useVpnGateClient, VpnServerRepository} from '../vpngate-client';
import {IVpnServer} from '../vpngate-client/models';
import ConnectionOptionsSheet from './components/ConnectionOptionsSheet';
import LoadingIndicatorWrapper from './components/LoadingIndicatorWrapper';
import RefetchServersButton from './components/RefetchServersButton';
import VpnServerList from './components/VpnServerList';

//#region Typedefs

export interface VpnServerListScreenDeps {
  useVpnServerRepository: () => VpnServerRepository;
  useVpnServerListNavigation: () => Pick<
    VpnServerListNavigationProps,
    'setOptions'
  >;
  presentConnectionOptionsSheet: (server: IVpnServer) => void;
  useBottomSheetModalRef: (
    initialValue: BottomSheetModal | null,
  ) => React.MutableRefObject<BottomSheetModal | null>;
}

export interface VpnServerListScreenProps {
  overrideDeps?: Partial<VpnServerListScreenDeps>;
}

//#endregion

function VpnServerListScreen({overrideDeps}: VpnServerListScreenProps) {
  const deps: VpnServerListScreenDeps = {
    useVpnServerRepository: useVpnGateClient,
    useVpnServerListNavigation: useNavigation,
    presentConnectionOptionsSheet: server => {
      bottomSheetModalRef.current?.present(server);
    },
    useBottomSheetModalRef: useRef,
    ...overrideDeps,
  };

  const {
    useVpnServerRepository,
    useVpnServerListNavigation,
    presentConnectionOptionsSheet,
    useBottomSheetModalRef,
  } = deps;

  const {vpnServers, isFetching, fetchServers} = useVpnServerRepository();
  const navigation = useVpnServerListNavigation();
  const bottomSheetModalRef = useBottomSheetModalRef(null);

  useEffect(() => {
    if (vpnServers.length > 0) {
      return;
    }

    const ac = new AbortController();

    fetchServers({signal: ac.signal});

    return () => {
      ac.abort();
    };
  }, [fetchServers, vpnServers.length]);

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
  }, [fetchServers, navigation]);

  const handleItemPress = useCallback(
    (server: IVpnServer) => {
      presentConnectionOptionsSheet(server);
    },
    [presentConnectionOptionsSheet],
  );

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
});

export default VpnServerListScreen;
