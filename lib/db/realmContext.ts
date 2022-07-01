import {createRealmContext} from '@realm/react';
import {VpnServer} from '../vpngate-client/models';

export default createRealmContext({
  schema: [VpnServer],
});
