import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider as PaperProvider} from 'react-native-paper';
import NavigationBar from './lib/common/NavigationBar';

const Stack = createStackNavigator();

function Dummy() {
  return <Text>Dummy View</Text>;
}

function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <GestureHandlerRootView style={styles.gestureRootView}>
          <Stack.Navigator
            screenOptions={{
              header: props => <NavigationBar {...props} />,
            }}>
            <Stack.Screen name="dummy" component={Dummy} />
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
