import * as React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Login from "./trash/Login";
import SettingsScreen from "./screens/SettingsSreen";
import AppContainer from "./screens/index";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

  switch (routeName) {
    case 'Feed':
      return 'News feed';
    case 'Profile':
      return 'My profile';
    case 'Account':
      return 'My account';
  }
}

function FeedScreen({ navigation }) {
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
            title="Go to Settings"
            onPress={() => navigation.navigate('Settings')}
        />
      </View>
  );
}

function ProfileScreen() {
  return <View />;
}

function AccountScreen() {
  return <View />;
}

// function SettingsScreen() {
//     return <View />;
// }


const Tab = createBottomTabNavigator();

function HomeTabs({ navigation, route }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  }, [navigation, route]);

  return (
      <Tab.Navigator>
        <Tab.Screen name="Feed" component={FeedScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
      </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

export default function Start() {
  return (
      // <NavigationContainer>
      //     <Stack.Navigator>
      //
      //         <Stack.Screen name="Login" component={Login}  options={{
      //             headerTransparent: true
      //
      //         }} />
      //         <Stack.Screen name="Home" component={HomeTabs} />
      //         <Stack.Screen name="Settings" component={SettingsScreen} />
      //
      //     </Stack.Navigator>
      // </NavigationContainer>
// <View style={styles.container}>
//         <GooglePlacesAutocomplete
//             placeholder='Search Address'
//             onPress={(getAddressText) => {
//                 // setLocation(getAddressText.description);
//                 console.log('description', getAddressText);
//             }}
//
//             // onPress={(data, details = null) => {
//             //     // 'details' is provided when fetchDetails = true
//             //     console.log(data, details);
//             // }}
//             query={{
//                 key: 'AIzaSyAHenjJYVRsj5kVTKTmFZbdSfGvn1zk3vI',
//                 language: 'en',
//             }}
//
//             styles={{
//                 textInputContainer: {
//                     // backgroundColor: 'black',
//                     width: '90%',
//                     borderWidth: 1,
//                     borderRadius: 10,
//                     padding: 20,
//                 },
//                 textInput: {
//                     height: 30,
//                     color: 'black',
//                     fontSize: 16,
//                 },
//                 predefinedPlacesDescription: {
//                     color: '#1faadb',
//                 },
//             }}
//
//         />
// </View>

      <AppContainer />
      //   <GooglePlacesAutocomplete
      //       placeholder='Search Address'
      //       onPress={(getAddressText) => {
      //           setLocation(getAddressText.description);
      //           // console.log('description', selectedAdress);
      //       }}
      //
      //       // onPress={(data, details = null) => {
      //       //     // 'details' is provided when fetchDetails = true
      //       //     console.log(data, details);
      //       // }}
      //       query={{
      //           key: 'AIzaSyAHenjJYVRsj5kVTKTmFZbdSfGvn1zk3vI',
      //           language: 'en',
      //       }}
      //
      //   />

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})