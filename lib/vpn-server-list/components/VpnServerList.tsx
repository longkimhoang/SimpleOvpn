import React, {useCallback} from 'react';
import {ListRenderItemInfo} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useTheme} from 'react-native-paper';
import {IVpnServer} from '../../vpngate-client/models';
import {VPN_SERVER_CELL_HEIGHT} from './constants';
import VpnServerCell from './VpnServerCell';

//#region FlatList implementations

function renderVpnServerItem(
  item: IVpnServer,
  onPress?: (server: IVpnServer) => void,
) {
  return <VpnServerCell data={item} onPress={() => onPress?.(item)} />;
}

function getVpnServerCellLayout(
  _data: IVpnServer[] | undefined | null,
  index: number,
) {
  return {
    length: VPN_SERVER_CELL_HEIGHT,
    offset: VPN_SERVER_CELL_HEIGHT * index,
    index,
  };
}

function extractKeyForVpnServerItem(item: IVpnServer): string {
  return item.ipAddress;
}

//#endregion

//#region Component

export interface VpnServerListProps {
  vpnServers: readonly IVpnServer[];
  onItemPress?: (server: IVpnServer) => void;
}

function VpnServerList({vpnServers, onItemPress}: VpnServerListProps) {
  const {colors} = useTheme();

  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<IVpnServer>) => {
      return renderVpnServerItem(item, onItemPress);
    },
    [onItemPress],
  );

  return (
    <FlatList
      data={vpnServers}
      renderItem={renderItem}
      getItemLayout={getVpnServerCellLayout}
      keyExtractor={extractKeyForVpnServerItem}
      initialNumToRender={8}
      windowSize={5}
      style={[
        {
          backgroundColor: colors.surface,
        },
      ]}
    />
  );
}

//#endregion

export default VpnServerList;
