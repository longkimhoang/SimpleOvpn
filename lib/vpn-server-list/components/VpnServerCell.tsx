import color from 'color';
import React, {PropsWithChildren} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {
  TouchableHighlight,
  TouchableNativeFeedback,
} from 'react-native-gesture-handler';
import {Text, useTheme} from 'react-native-paper';
import {IVpnServer} from '../../vpngate-client/models';
import {VPN_SERVER_CELL_HEIGHT} from './constants';

export interface VpnServerCellProps {
  data: IVpnServer;
  onPress?: () => void;
}

type VpnServerCellWrapperProps = PropsWithChildren<
  Omit<VpnServerCellProps, 'data'>
>;

function VpnServerCellWrapper({
  onPress,
  children,
  ...rest
}: VpnServerCellWrapperProps) {
  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback
        {...rest}
        style={[styles.container]}
        onPress={onPress}>
        {children}
      </TouchableNativeFeedback>
    );
  } else {
    return (
      <TouchableHighlight
        {...rest}
        onPress={onPress}
        style={[styles.container]}>
        {children}
      </TouchableHighlight>
    );
  }
}

function VpnServerCell({data, onPress, ...rest}: VpnServerCellProps) {
  const {hostName, ipAddress} = data;
  const theme = useTheme();

  const titleColor = theme.isV3
    ? theme.colors.onSurface
    : color(theme.colors.text).alpha(0.87).rgb().string();

  const descriptionColor = theme.isV3
    ? theme.colors.onSurfaceVariant
    : color(theme.colors.text).alpha(0.54).rgb().string();

  return (
    <VpnServerCellWrapper {...rest}>
      <View style={styles.row}>
        <View style={[styles.item, styles.content]}>
          <Text
            variant="bodyLarge"
            numberOfLines={1}
            style={[
              {
                color: titleColor,
              },
            ]}>
            {`${hostName}.opengw.net`}
          </Text>
          <Text
            variant="bodyMedium"
            numberOfLines={2}
            style={[
              {
                color: descriptionColor,
              },
            ]}>
            {ipAddress}
          </Text>
        </View>
      </View>
    </VpnServerCellWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    height: VPN_SERVER_CELL_HEIGHT,
  },
  row: {
    flexDirection: 'row',
  },
  item: {
    marginVertical: 6,
    paddingLeft: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default React.memo(VpnServerCell);
