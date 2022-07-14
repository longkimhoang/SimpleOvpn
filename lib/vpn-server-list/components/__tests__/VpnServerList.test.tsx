import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {IVpnServer} from '../../../vpngate-client/models';
import VpnServerList, {exportedForTesting} from '../VpnServerList';

describe('VpnServerList', () => {
  function generateVpnServers(count: number): IVpnServer[] {
    let servers: IVpnServer[] = [];

    for (let i = 0; i < count; ++i) {
      const mockVpnServer: IVpnServer = {
        hostName: 'public-vpn-90',
        ipAddress: `219.100.37.55-${i}`,
        score: 3037585,
        ping: 16,
        speed: 71957702,
        country: 'Japan',
        countryCode: 'JP',
        operator: 'Daiyuu Nobori_ Japan. Academic Use Only.',
        base64EncodedOvpnConfig: 'mockBase64OvpnConfig',
      };

      servers.push(mockVpnServer);
    }

    return servers;
  }

  test('render empty state', () => {
    const tree = render(<VpnServerList vpnServers={[]} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('render items', () => {
    const items = generateVpnServers(5);
    const tree = render(<VpnServerList vpnServers={items} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('getVpnServerCellLayout called correctly', () => {
    const {getVpnServerCellLayout} = exportedForTesting;
    const items = generateVpnServers(2);
    const layouts = items.map((_, index, data) => {
      return getVpnServerCellLayout(data, index);
    });

    const expectedLayouts = [
      {
        length: 60,
        offset: 0,
        index: 0,
      },
      {
        length: 60,
        offset: 60,
        index: 1,
      },
    ];

    expect(layouts).toEqual(expectedLayouts);
  });

  test('should fire event handler correctly', () => {
    const items = generateVpnServers(1);
    const mockOnPress = jest.fn();
    const {queryByTestId} = render(
      <VpnServerList vpnServers={items} onItemPress={mockOnPress} />,
    );

    const cellElement = queryByTestId('vpn-server-list.cell');
    fireEvent(cellElement!, 'onPress');

    expect(mockOnPress).toHaveBeenCalledTimes(1);
    expect(mockOnPress).toHaveBeenCalledWith(items[0]);
  });
});
