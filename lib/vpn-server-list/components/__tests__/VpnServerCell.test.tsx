import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {IVpnServer} from '../../../vpngate-client/models';
import VpnServerCell from '../VpnServerCell';

describe('VpnServerCell', () => {
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

  test('should render correctly', () => {
    const tree = render(<VpnServerCell data={mockVpnServer} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('should format hostName correctly', () => {
    const {queryByText} = render(<VpnServerCell data={mockVpnServer} />);

    expect(queryByText('public-vpn-90.opengw.net')).not.toBeNull();
  });

  test('should fire event handler correctly', () => {
    const mockOnPress = jest.fn();
    const {queryByTestId} = render(
      <VpnServerCell data={mockVpnServer} onPress={mockOnPress} />,
    );

    const buttonElement = queryByTestId('vpn-server-list.cell');
    fireEvent(buttonElement!, 'onPress');

    expect(mockOnPress).toBeCalledTimes(1);
  });
});
