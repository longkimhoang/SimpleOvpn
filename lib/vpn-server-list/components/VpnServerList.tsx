import React from 'react';
import {ListRenderItemInfo} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useTheme} from 'react-native-paper';
import {IVpnServer} from '../../vpngate-client/models';
import {VPN_SERVER_CELL_HEIGHT} from './constants';
import VpnServerCell from './VpnServerCell';

//#region FlatList implementations

function renderVpnServerItem({item}: ListRenderItemInfo<IVpnServer>) {
  return <VpnServerCell data={item} />;
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
}

function VpnServerList({vpnServers}: VpnServerListProps) {
  const {colors} = useTheme();

  return (
    <FlatList
      data={vpnServers}
      renderItem={renderVpnServerItem}
      getItemLayout={getVpnServerCellLayout}
      keyExtractor={extractKeyForVpnServerItem}
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
