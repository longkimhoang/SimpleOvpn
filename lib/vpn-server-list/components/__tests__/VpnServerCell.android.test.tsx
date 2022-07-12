import {render} from '@testing-library/react-native';
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

  test('given platform is Android, should render correctly', () => {
    jest.mock('react-native/Libraries/Utilities/Platform', () => ({
      OS: 'android',
    }));

    const tree = render(<VpnServerCell data={mockVpnServer} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
