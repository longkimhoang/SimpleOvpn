import {useMMKV, useMMKVObject} from 'react-native-mmkv';
import {IVpnServer} from './models';

/**
 * A type that manages local storage of fetched VPN servers
 */
export interface VpnServerStorage {
  data: readonly IVpnServer[];
  write(data: readonly IVpnServer[]): void | Promise<void>;
}

export function useMmkvVpnServerStorage(): VpnServerStorage {
  const storage = useMMKV({
    id: 'vpngate',
  });

  const [servers, setServers] = useMMKVObject<readonly IVpnServer[]>(
    'vpn-servers',
    storage,
  );

  return {
    data: servers ?? [],
    write: setServers,
  };
}
