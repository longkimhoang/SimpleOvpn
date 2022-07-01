import csv from 'csvtojson';
import {useCallback, useEffect, useState} from 'react';
import compactMap from '../common/compactMap';
import RealmContext from '../db/realmContext';
import {VPN_GATE_SERVERS_LIST_URL} from './constants';
import {VpnServerRepository} from './interface';
import {IVpnServer, VpnServer} from './models';

//#region Typedefs

export type FetchVpnServersAction = () => Promise<readonly IVpnServer[]>;

export interface UseVpnGateClientDeps {
  fetchVpnServersAction: FetchVpnServersAction;
}

//#endregion

//#region Fetch and parse VPNGate response

const converter = csv();

function convertToVpnServer(value: any): IVpnServer {
  return {
    hostName: value['#HostName'],
    ipAddress: value['IP'],
    score: parseInt(value['Score']),
    ping: parseInt(value['Ping']),
    speed: parseInt(value['Speed']),
    country: value['CountryLong'],
    countryCode: value['CountryShort'],
    operator: value['Operator'],
    base64EncodedOvpnConfig: value['OpenVPN_ConfigData_Base64'],
  };
}

export const fetchVpnGateServers: FetchVpnServersAction = async () => {
  const response = await fetch(VPN_GATE_SERVERS_LIST_URL);
  const body = await response.text();

  const lines = body.split(/\r?\n/).map(s => s.trim());
  const data = lines.slice(1).join('\n');

  return await converter
    .fromString(data)
    .then(values => compactMap(values, convertToVpnServer));
};

//#endregion

//#region Hook

export function useVpnGateClient(
  deps: UseVpnGateClientDeps = {
    fetchVpnServersAction: fetchVpnGateServers,
  },
): VpnServerRepository {
  const {fetchVpnServersAction} = deps;
  const {useRealm, useQuery} = RealmContext;

  const [isFetching, setIsFetching] = useState(() => false);
  const realm = useRealm();
  const result = useQuery(VpnServer);
  const dispatch = useCallback(() => {
    setIsFetching(true);

    fetchVpnServersAction().then(vpnServers => {
      realm.write(() => {
        for (const server of vpnServers) {
          realm.create(VpnServer, VpnServer.generate(server));
        }
      });

      setIsFetching(false);
    });
  }, []);

  return {
    vpnServers: result,
    isFetching,
    fetchServers: dispatch,
  };
}

//#endregion
