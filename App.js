import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/home.js'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SearchScreen from './screens/search.js';
import FullListScreen from './screens/fullList.js';
import Shell from './screens/shell.js';
import Nations from './screens/nations.js'
import NationWise from './screens/nationWise.js';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar hidden />
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen}
      options ={
        {headerShown:false}
      }
      />
      <Stack.Screen name = "Search" component={SearchScreen}
      options = {
        {headerShown:false}
      }
      />
      <Stack.Screen name = "FullList" component = {FullListScreen} 
      options = {
        {headerShown:false}
      }/>
      <Stack.Screen name="Shell" component = {Shell}
      options = {
        {headerShown:false}
      }
      />
      <Stack.Screen name = "Nations" component = {Nations}
      options = {
        {headerShown:false}
      }
      />
      <Stack.Screen name = "NationWise" component = {NationWise}
      options = {
        {headerShown:false}
      }/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
