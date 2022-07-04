import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import NavigationBar, {NavigationBarProps} from '../NavigationBar';

describe('NavigationBar', () => {
  test('given headerTitle, render title with it', () => {
    const props = {
      options: {
        headerTitle: 'Header Title',
      },
    } as NavigationBarProps;

    const {queryByTestId} = render(<NavigationBar {...props} />);

    expect(queryByTestId('navbar.title')).toHaveTextContent('Header Title');
  });

  test('given title, render title with it', () => {
    const props = {
      options: {
        title: 'Header Title',
      },
    } as NavigationBarProps;

    const {queryByTestId} = render(<NavigationBar {...props} />);

    expect(queryByTestId('navbar.title')).toHaveTextContent('Header Title');
  });

  test('given route, render title with its name', () => {
    const props = {
      options: {},
      route: {
        name: 'route',
      },
    } as NavigationBarProps;

    const {queryByTestId} = render(<NavigationBar {...props} />);

    expect(queryByTestId('navbar.title')).toHaveTextContent('route');
  });

  test('given back property, display back button', () => {
    const mockGoBackFn = jest.fn();

    const props = {
      options: {
        headerTitle: 'Header Title',
      },
      navigation: {
        goBack: mockGoBackFn,
      } as any,
      back: {
        title: 'Previous',
      },
    } as NavigationBarProps;

    const {queryByTestId} = render(<NavigationBar {...props} />);

    const backButton = queryByTestId('navbar.button.back');
    expect(backButton).not.toBeNull();

    fireEvent(backButton!, 'onPress');
    expect(mockGoBackFn).toHaveBeenCalled();
  });
});
