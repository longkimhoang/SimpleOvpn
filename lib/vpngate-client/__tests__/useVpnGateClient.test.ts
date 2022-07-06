import {renderHook, act} from '@testing-library/react-hooks';
import {useCallback, useState} from 'react';
import RealmContext from '../../db/realmContext';
import {fetchVpnGateServers, useVpnGateClient} from '../hook';
import {VpnServerRepository} from '../interface';
import {IVpnServer, VpnServer} from '../models';

describe('useVpnGateClient', () => {
  const mockUseRealm = jest.fn();
  const mockUseQuery = jest.fn();

  beforeAll(() => {
    RealmContext.useRealm = mockUseRealm;
    RealmContext.useQuery = mockUseQuery;
  });

  beforeEach(() => {
    mockUseRealm.mockReset();
    mockUseQuery.mockReset();
  });

  const mockVpnServer: IVpnServer = {
    hostName: 'public-vpn-90',
    ipAddress: '219.100.37.55',
    score: 3037585,
    ping: 16,
    speed: 71957702,
    country: 'Japan',
    countryCode: 'JP',
    operator: 'Daiyuu Nobori_ Japan. Academic Use Only.',
    base64EncodedOvpnConfig: 'mockBase64OvpnConfig',
  };

  it('should fetch and parse the response correctly', async () => {
    const mockResponse = `*vpn_servers
    #HostName,IP,Score,Ping,Speed,CountryLong,CountryShort,NumVpnSessions,Uptime,TotalUsers,TotalTraffic,LogType,Operator,Message,OpenVPN_ConfigData_Base64
    public-vpn-90,219.100.37.55,3037585,16,71957702,Japan,JP,339,3046622253,8720863,449901453895676,2weeks,Daiyuu Nobori_ Japan. Academic Use Only.,,mockBase64OvpnConfig
    *
    `;

    global.fetch = jest.fn().mockImplementationOnce(() => {
      return {
        text: async () => mockResponse,
      };
    });

    const servers = await fetchVpnGateServers();

    expect(servers).toEqual([mockVpnServer]);
  });

  it('should return parsed VpnServer objects', async () => {
    const mockFetchVpnServersAction = jest.fn(() => {
      return Promise.resolve([mockVpnServer]);
    });

    function useMockUseVpnServerStorage() {
      const [data, setData] = useState<readonly IVpnServer[]>(() => []);
      const write = useCallback((newData: readonly IVpnServer[]) => {
        setData(newData);
      }, []);

      return {
        data,
        write,
      };
    }

    const {result, waitForNextUpdate} = renderHook(() =>
      useVpnGateClient({
        fetchVpnServersAction: mockFetchVpnServersAction,
        useVpnServerStorage: useMockUseVpnServerStorage,
      }),
    );

    const {fetchServers} = result.current;

    expect(result.current.vpnServers).toEqual([]);
    expect(result.current.isFetching).toEqual(false);

    mockUseQuery.mockReturnValue([mockVpnServer]);

    act(() => {
      fetchServers();
    });

    await waitForNextUpdate();

    expect(result.all[1] as VpnServerRepository).toHaveProperty(
      'isFetching',
      true,
    );
    expect(result.all[3] as VpnServerRepository).toMatchObject({
      isFetching: false,
      vpnServers: [mockVpnServer],
    });
  });
});
