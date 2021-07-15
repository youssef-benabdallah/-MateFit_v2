/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {Button, ColorSchemeName} from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import {RootStackParamList} from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import Activity from "../screens/Activity";
import Profile from "../screens/Profile";
import BookTrainer from "../screens/BookTrainer";
import MyProfile from "../screens/MyProfile";
import TrainerSearch from "../screens/TrainerSearch";
import BookingRequest from "../screens/BookingRequest";


export default function Navigation({navigation}, {colorScheme}: { colorScheme: ColorSchemeName }) {
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator/>
        </NavigationContainer>
    );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
    return (
        <Stack.Navigator screenOptions={{headerShown: true}}>
            <Stack.Screen name="MateFit" component={BottomTabNavigator}/>
            <Stack.Screen name="Activity" component={Activity}/>
            <Stack.Screen name="Profile" component={Profile}/>
            <Stack.Screen name="BookTrainer" component={BookTrainer}/>
            <Stack.Screen name="TrainerSearch" component={TrainerSearch}/>
            <Stack.Screen name="BookingRequest" component={BookingRequest}/>


            <Stack.Screen name="MyProfile" component={MyProfile}/>

            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}}/>
        </Stack.Navigator>
    );
}
