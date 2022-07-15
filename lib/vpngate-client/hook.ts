import csv from 'csvtojson';
import {useCallback, useState} from 'react';
import compactMap from '../common/compactMap';
import {VPN_GATE_SERVERS_LIST_URL} from './constants';
import {FetchServersOptions, VpnServerRepository} from './interface';
import {IVpnServer} from './models';
import {useMmkvVpnServerStorage, VpnServerStorage} from './storage';

//#region Typedefs

export interface FetchVpnServersActionOptions {
  signal?: AbortSignal;
}

export type FetchVpnServersAction = (
  options?: FetchVpnServersActionOptions,
) => Promise<readonly IVpnServer[]>;

export interface UseVpnGateClientDeps {
  fetchVpnServersAction: FetchVpnServersAction;
  useVpnServerStorage: () => VpnServerStorage;
}

//#endregion

//#region Fetch and parse VPNGate response

const converter = csv();

function convertToVpnServer(value: any): IVpnServer {
  return {
    hostName: value['#HostName'],
    ipAddress: value.IP,
    score: parseInt(value.Score, 10),
    ping: parseInt(value.Ping, 10),
    speed: parseInt(value.Speed, 10),
    country: value.CountryLong,
    countryCode: value.CountryShort,
    operator: value.Operator,
    base64EncodedOvpnConfig: value.OpenVPN_ConfigData_Base64,
  };
}

export const fetchVpnGateServers: FetchVpnServersAction = async options => {
  const response = await fetch(VPN_GATE_SERVERS_LIST_URL, {
    signal: options?.signal,
  });
  const body = await response.text();

  const lines = body.split(/\r?\n/).map(s => s.trim());
  const data = lines.slice(1, -2).join('\n');

  return converter
    .fromString(data)
    .then(values => compactMap(values, convertToVpnServer));
};

//#endregion

//#region Hook

export function useVpnGateClient(
  overrideDeps?: Partial<UseVpnGateClientDeps>,
): VpnServerRepository {
  const deps: UseVpnGateClientDeps = {
    fetchVpnServersAction: fetchVpnGateServers,
    useVpnServerStorage: useMmkvVpnServerStorage,
    ...overrideDeps,
  };

  const {fetchVpnServersAction, useVpnServerStorage} = deps;

  const [isFetching, setIsFetching] = useState(() => false);
  const {data, write} = useVpnServerStorage();
  const dispatch = useCallback(
    (options?: FetchServersOptions) => {
      setIsFetching(true);

      fetchVpnServersAction({signal: options?.signal}).then(vpnServers => {
        write(vpnServers);

        setIsFetching(false);
      });
    },
    [fetchVpnServersAction, write],
  );

  return {
    vpnServers: data,
    isFetching,
    fetchServers: dispatch,
  };
}

//#endregion
