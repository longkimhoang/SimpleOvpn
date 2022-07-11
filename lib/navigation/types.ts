import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';

export type RootStackParamList = {
  'vpn-server.list': undefined;
};

export type VpnServerListScreenProps = StackScreenProps<
  RootStackParamList,
  'vpn-server.list'
>;

export type VpnServerListNavigationProps = StackNavigationProp<
  RootStackParamList,
  'vpn-server.list'
>;
