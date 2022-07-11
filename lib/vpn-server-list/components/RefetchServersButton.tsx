import React, {useCallback, useRef} from 'react';
import {Appbar} from 'react-native-paper';
import {VpnServerRepository} from '../../vpngate-client';

export type RefetchServersButtonProps = Pick<
  VpnServerRepository,
  'fetchServers'
>;

function RefetchServersButton({fetchServers}: RefetchServersButtonProps) {
  const ref = useRef<AbortController>();

  const refetchServers = useCallback(() => {
    if (ref.current) {
      ref.current.abort();
    }

    ref.current = new AbortController();

    fetchServers({signal: ref.current.signal});
  }, [fetchServers]);

  return <Appbar.Action icon="reload" onPress={refetchServers} />;
}

export default RefetchServersButton;
