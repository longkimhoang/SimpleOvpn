import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {
  advanceAnimationByTime,
  withReanimatedTimer,
} from 'react-native-reanimated/lib/reanimated2/jestUtils';
import {VpnServerRepository} from '../../vpngate-client';
import {IVpnServer} from '../../vpngate-client/models';
import VpnServerListScreen from '../VpnServerListScreen';

describe('VpnServerListScreen', () => {
  const mockEmptyStateUseVpnServersRepository = jest.fn(() => {
    const repository: VpnServerRepository = {
      isFetching: false,
      vpnServers: [],
      fetchServers: jest.fn(),
    };

    return repository;
  });

  test('render empty state', () => {
    const mockUseVpnServerListNavigation = () => ({
      setOptions: jest.fn(),
    });

    withReanimatedTimer(() => {
      const tree = render(
        <BottomSheetModalProvider>
          <VpnServerListScreen
            overrideDeps={{
              useVpnServerRepository: mockEmptyStateUseVpnServersRepository,
              useVpnServerListNavigation: mockUseVpnServerListNavigation,
            }}
          />
        </BottomSheetModalProvider>,
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  test('render loading state', () => {
    const mockUseVpnServersRepository = jest.fn(() => {
      const repository: VpnServerRepository = {
        isFetching: true,
        vpnServers: [],
        fetchServers: jest.fn(),
      };

      return repository;
    });

    const mockUseVpnServerListNavigation = () => ({
      setOptions: jest.fn(),
    });

    withReanimatedTimer(() => {
      const tree = render(
        <BottomSheetModalProvider>
          <VpnServerListScreen
            overrideDeps={{
              useVpnServerRepository: mockUseVpnServersRepository,
              useVpnServerListNavigation: mockUseVpnServerListNavigation,
            }}
          />
        </BottomSheetModalProvider>,
      ).toJSON();

      advanceAnimationByTime(300);

      expect(tree).toMatchSnapshot();
    });
  });

  test('pass botton sheet ref correctly', () => {
    const mockUseVpnServerListNavigation = () => ({
      setOptions: jest.fn(),
    });

    type BottomSheetModalRef =
      React.MutableRefObject<BottomSheetModalMethods | null>;

    let mockBottomSheetModalRef: BottomSheetModalMethods | null = null;

    const mockUseBottomSheetModalRef = () =>
      Object.defineProperty({}, 'current', {
        get: () => mockBottomSheetModalRef,
        set: value => (mockBottomSheetModalRef = value),
      }) as BottomSheetModalRef;

    withReanimatedTimer(() => {
      render(
        <BottomSheetModalProvider>
          <VpnServerListScreen
            overrideDeps={{
              useVpnServerRepository: mockEmptyStateUseVpnServersRepository,
              useVpnServerListNavigation: mockUseVpnServerListNavigation,
              useBottomSheetModalRef: mockUseBottomSheetModalRef,
            }}
          />
        </BottomSheetModalProvider>,
      );

      expect(mockBottomSheetModalRef).toHaveProperty('present');
    });
  });

  test('when onPress is fired, bottomSheetModalRef.present will be invoked', () => {
    const mockVpnServer: IVpnServer = {
      hostName: 'public-vpn-90',
      ipAddress: `219.100.37.55`,
      score: 3037585,
      ping: 16,
      speed: 71957702,
      country: 'Japan',
      countryCode: 'JP',
      operator: 'Daiyuu Nobori_ Japan. Academic Use Only.',
      base64EncodedOvpnConfig: 'mockBase64OvpnConfig',
    };

    const mockUseVpnServersRepository = jest.fn(() => {
      const repository: VpnServerRepository = {
        isFetching: false,
        vpnServers: [mockVpnServer],
        fetchServers: jest.fn(),
      };

      return repository;
    });

    const mockUseVpnServerListNavigation = () => ({
      setOptions: jest.fn(),
    });

    const mockPresentConnectionOptionsSheet = jest.fn();

    withReanimatedTimer(() => {
      const {queryByTestId} = render(
        <BottomSheetModalProvider>
          <VpnServerListScreen
            overrideDeps={{
              useVpnServerRepository: mockUseVpnServersRepository,
              useVpnServerListNavigation: mockUseVpnServerListNavigation,
              presentConnectionOptionsSheet: mockPresentConnectionOptionsSheet,
            }}
          />
        </BottomSheetModalProvider>,
      );

      const cellElement = queryByTestId('vpn-server-list.cell');
      fireEvent(cellElement!, 'onPress');

      expect(mockPresentConnectionOptionsSheet).toBeCalledTimes(1);
      expect(mockPresentConnectionOptionsSheet).toBeCalledWith(mockVpnServer);
    });
  });

  test('given non-empty vpnServers array, when mounted, should not call fetchServers', () => {
    const mockFetchServers = jest.fn();
    const mockUseVpnServersRepository = jest.fn(() => {
      const repository: VpnServerRepository = {
        isFetching: false,
        vpnServers: [
          {
            hostName: 'public-vpn-90',
            ipAddress: `219.100.37.55`,
            score: 3037585,
            ping: 16,
            speed: 71957702,
            country: 'Japan',
            countryCode: 'JP',
            operator: 'Daiyuu Nobori_ Japan. Academic Use Only.',
            base64EncodedOvpnConfig: 'mockBase64OvpnConfig',
          },
        ],
        fetchServers: mockFetchServers,
      };

      return repository;
    });

    const mockUseVpnServerListNavigation = () => ({
      setOptions: jest.fn(),
    });

    withReanimatedTimer(() => {
      render(
        <BottomSheetModalProvider>
          <VpnServerListScreen
            overrideDeps={{
              useVpnServerRepository: mockUseVpnServersRepository,
              useVpnServerListNavigation: mockUseVpnServerListNavigation,
            }}
          />
        </BottomSheetModalProvider>,
      );

      expect(mockFetchServers).toHaveBeenCalledTimes(0);
    });
  });

  test('given empty vpnServers array, when mounted, should call fetchServers', () => {
    const mockFetchServers = jest.fn();
    const mockUseVpnServersRepository = jest.fn(() => {
      const repository: VpnServerRepository = {
        isFetching: false,
        vpnServers: [],
        fetchServers: mockFetchServers,
      };

      return repository;
    });

    const mockUseVpnServerListNavigation = () => ({
      setOptions: jest.fn(),
    });

    withReanimatedTimer(() => {
      render(
        <BottomSheetModalProvider>
          <VpnServerListScreen
            overrideDeps={{
              useVpnServerRepository: mockUseVpnServersRepository,
              useVpnServerListNavigation: mockUseVpnServerListNavigation,
            }}
          />
        </BottomSheetModalProvider>,
      );

      expect(mockFetchServers).toHaveBeenCalledTimes(1);
    });
  });

  test('when mounted, should set the header for the navigation stack', () => {
    const mockSetOptions = jest.fn();

    const mockUseVpnServerListNavigation = () => ({
      setOptions: mockSetOptions,
    });

    withReanimatedTimer(() => {
      render(
        <BottomSheetModalProvider>
          <VpnServerListScreen
            overrideDeps={{
              useVpnServerRepository: mockEmptyStateUseVpnServersRepository,
              useVpnServerListNavigation: mockUseVpnServerListNavigation,
            }}
          />
        </BottomSheetModalProvider>,
      );

      expect(mockSetOptions).toBeCalledTimes(1);

      const setOptionsArgs = mockSetOptions.mock.calls[0];
      expect(setOptionsArgs.length).toBe(1);
      expect(setOptionsArgs[0]).toHaveProperty('header');

      const headerFn = setOptionsArgs[0].header;
      expect(headerFn).toBeInstanceOf(Function);

      const {queryByTestId} = render(
        headerFn({
          options: {
            headerTitle: 'Title',
          },
        }),
      );
      expect(queryByTestId('navbar.title')).toHaveTextContent('Title');
    });
  });
});
