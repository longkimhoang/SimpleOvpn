import {IVpnServer} from './models';

export interface FetchServersOptions {
  signal?: AbortSignal;
}

export interface VpnServerRepository {
  vpnServers: readonly IVpnServer[];
  isFetching: boolean;
  fetchServers(options?: FetchServersOptions): void;
}
