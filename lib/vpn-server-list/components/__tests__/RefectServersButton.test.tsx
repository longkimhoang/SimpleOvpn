import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import RefetchServersButton from '../RefetchServersButton';

describe('RefetchServersButton', () => {
  test('should render correctly', () => {
    const mockFetchServers = jest.fn();

    const tree = render(
      <RefetchServersButton fetchServers={mockFetchServers} />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('when tapped, should perform servers refetch', () => {
    const mockFetchServers = jest.fn();

    const {queryByTestId} = render(
      <RefetchServersButton fetchServers={mockFetchServers} />,
    );

    const buttonElement = queryByTestId(
      'vpn-server-list.button.refetch-servers',
    );

    fireEvent(buttonElement!, 'onPress');

    expect(mockFetchServers).toHaveBeenCalledTimes(1);
  });

  test('given a refetch in progress, when tapped again, should cancel the current one', () => {
    const mockFetchServers = jest.fn();

    const {queryByTestId} = render(
      <RefetchServersButton fetchServers={mockFetchServers} />,
    );

    const buttonElement = queryByTestId(
      'vpn-server-list.button.refetch-servers',
    );

    const abortSpy = jest.spyOn(AbortController.prototype, 'abort');

    fireEvent(buttonElement!, 'onPress');
    fireEvent(buttonElement!, 'onPress');

    expect(abortSpy).toHaveBeenCalledTimes(1);
  });
});
