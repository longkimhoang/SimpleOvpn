import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider as PaperProvider} from 'react-native-paper';
import NavigationBar from './lib/common/NavigationBar';
import {RootStackParamList} from './lib/navigation/types';
import VpnServerListScreen from './lib/vpn-server-list/VpnServerListScreen';

const Stack = createStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <GestureHandlerRootView style={styles.gestureRootView}>
          <Stack.Navigator
            screenOptions={{
              header: props => <NavigationBar {...props} />,
            }}>
            <Stack.Screen
              name="vpn-server.list"
              component={VpnServerListScreen}
              options={{
                headerTitle: 'Server List',
              }}
            />
          </Stack.Navigator>
        </GestureHandlerRootView>
      </PaperProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  gestureRootView: {
    flex: 1,
  },
});

export default App;
