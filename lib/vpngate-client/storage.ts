import RealmContext from '../db/realmContext';
import {IVpnServer, VpnServer} from './models';

// A type that manages local storage of fetched VPN servers
export interface VpnServerStorage {
  data: readonly IVpnServer[];
  write(data: readonly IVpnServer[]): void;
}

export function useRealmVpnServerStorage(): VpnServerStorage {
  const {useQuery, useRealm} = RealmContext;

  const realm = useRealm();

  return {
    data: useQuery(VpnServer),
    write: data => {
      realm.write(() => {
        for (const server of data) {
          realm.create(VpnServer, VpnServer.generate(server), Realm.UpdateMode.Modified);
        }
      });
    },
  };
}
