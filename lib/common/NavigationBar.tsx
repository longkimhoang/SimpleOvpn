import {StackHeaderProps} from '@react-navigation/stack';
import React from 'react';
import {Appbar} from 'react-native-paper';

function extractHeaderTitle({
  options,
  route,
}: Pick<StackHeaderProps, 'options' | 'route'>): string {
  if (options.headerTitle && typeof options.headerTitle == 'string') {
    return options.headerTitle;
  }

  if (options.title) {
    return options.title;
  }

  return route.name;
}

function NavigationBar({navigation, back, options, route}: StackHeaderProps) {
  const title = extractHeaderTitle({options, route});

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
}

export default NavigationBar;
