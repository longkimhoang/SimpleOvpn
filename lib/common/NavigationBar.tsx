import {StackHeaderProps} from '@react-navigation/stack';
import React from 'react';
import {Appbar} from 'react-native-paper';

function extractHeaderTitle({
  options,
  route,
}: Pick<StackHeaderProps, 'options' | 'route'>): string {
  if (options.headerTitle && typeof options.headerTitle === 'string') {
    return options.headerTitle;
  }

  if (options.title) {
    return options.title;
  }

  return route.name;
}

export type NavigationBarProps = Pick<
  StackHeaderProps,
  'navigation' | 'back' | 'options' | 'route'
> & {
  headerRight?: () => React.ReactNode;
};

function NavigationBar({
  navigation,
  back,
  options,
  route,
  headerRight,
}: NavigationBarProps) {
  const title = extractHeaderTitle({options, route});

  return (
    <Appbar.Header>
      {back ? (
        <Appbar.BackAction
          onPress={navigation.goBack}
          testID="navbar.button.back"
        />
      ) : null}
      <Appbar.Content title={title} testID="navbar.title" />
      {headerRight?.()}
    </Appbar.Header>
  );
}

export default NavigationBar;
