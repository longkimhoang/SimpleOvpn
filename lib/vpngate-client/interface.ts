import {IVpnServer} from './models';

export interface VpnServerRepository {
  vpnServers: readonly IVpnServer[];
  isFetching: boolean;
  fetchServers(): void;
}
