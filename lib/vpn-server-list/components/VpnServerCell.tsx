import React from 'react';
import {List} from 'react-native-paper';
import {IVpnServer} from '../../vpngate-client/models';

export interface VpnServerCellProps {
  data: IVpnServer;
}

function VpnServerCell({data}: VpnServerCellProps) {
  const {hostName, ipAddress} = data;

  return <List.Item title={`${hostName}.opengw.net`} description={ipAddress} />;
}

export default React.memo(VpnServerCell);
